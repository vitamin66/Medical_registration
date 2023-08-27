<template>
  <div class="certification">
    <el-card class="box-card">
      <!-- 实名认证卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>认证信息</span>
        </div>
      </template>
      <!-- 提示信息部分 -->
      <div class="tip">
        <svg t="1692868091008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4017" width="16" height="16">
          <path
            d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z"
            p-id="4018" fill="#7f7f7f"></path>
        </svg>
        <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</p>
      </div>
      <!-- 描述信息部分 认证了就显示这个 (2选1) -->
      <div class="userInfo" v-if="userInfo?.authStatus == 1">
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                用户姓名
              </div>
            </template>
            {{ userInfo?.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件类型
              </div>
            </template>
            {{ userInfo?.certificatesType == 10 ? '身份证' : '户口本' }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件号码
              </div>
            </template>
            {{ userInfo?.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 实名认证表单部分 未认证就显示这个 (2选1) -->
      <el-form  ref="form" v-if="userInfo?.authStatus == 0"  class="demo-ruleForm" status-icon="true" :model="parmas"
        :rules="rules" style="width: 60%;margin: 20px auto;">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="parmas.name" />
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="parmas.certificatesType">
            <el-option :label=item.name :value=item.value v-for="(item, index) in documentsType" :key="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
          <el-input placeholder="请输入证件号码" v-model="parmas.certificatesNo" />
        </el-form-item>
        <el-form-item label="上传证件" prop="certificatesUrl">
          <!-- action="/api/oss/file/fileUpload?fileHost=userAuah" -->
          <el-upload ref="upload" list-type="picture-card"
            action="http://syt.atguigu.cn/api/oss/file/fileUpload?fileHost=userAuah" limit="1" drag="true"
            :on-exceed="exceed" :on-success="success" :on-remove="remove" :on-preview="handlePictureCardPreview">
            <img src="../../../assets/images/auth_example.png" />
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img v-if="parmas.certificatesUrl" w-full :src="parmas.certificatesUrl" style="width: 100%;height: 100%;" />
          </el-dialog>
        </el-form-item>
        <el-form-item style="margin-left: 70px;">
          <el-button type="primary" @click="submitFormData">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import axios from '../../../utils/request';
import { onMounted, ref, reactive } from 'vue'
// 存储用户信息
let userInfo = ref<any>({})
// 存储证件类型
let documentsType = ref<any>([])
// 表单项的v-model数据 没有v-model无法输入值
let parmas = reactive<any>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})
// 拿到form表单实例
let form = ref()
// 页面挂载完毕就发请求拿到用户信息 如果有就显示userInfo盒子 没有就显示 el-form 盒子
onMounted(() => {
  // 获取用户信息的方法
  getUserInfo()
  // 挂载完毕除了获取用户信息 还需要获取证件类型
  getDocumentsType()
})
// 获取用户信息的方法
const getUserInfo = () => {
  axios.get(`/api/user/auth/getUserInfo`).then((res: any) => {
    if (res.code == 200) {
      userInfo.value = res.data
    }
  })
}

// 获取证件类型的方法
const getDocumentsType = () => {
  axios.get(`/api/cmn/dict/findByDictCode/CertificatesType`).then((res: any) => {
    if (res.code == 200) {
      documentsType.value = res.data
    }
  })
}

// 照片上传超出限制触发的钩子
const exceed = () => {
  ElMessage({
    type: 'error',
    message: '最多上传一张照片'
  })
}

// 照片上传成功后执行的钩子 需要把照片地址存起来
const success = (response: any) => {
  // 上传成功校验不会消失 需要手动清除 certificatesUrl 字段的校验提示
  form.value.clearValidate('certificatesUrl')
  if (response.code == 200) {
    parmas.certificatesUrl = response.data
  }
}

// 照片移除时触发的钩子 (需要把数据清空)
const remove = () => {
  parmas.certificatesUrl = ''
}

// 控制预览图片的dialog 显示与隐藏
let dialogVisible = ref<boolean>(false)
// 照片预览时触发的钩子
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}

// 拿到组件实例
let upload = ref<any>()
// 重置按钮的点击事件回调
const reset = () => {
  // 清空表单数据
  Object.assign(parmas, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: ""
  })
  // 清除照片
  upload.value.clearFiles()
}

// 提交按钮的点击事件回调
const submitFormData =async () => {
  // 提交之前要让所有的表单项以及证件照校验一下
  await form.value.validate()

  try {
   await axios.post(`/api/user/auth/userAuah`, {
      certificatesNo: parmas.certificatesNo,
      certificatesType: parmas.certificatesType,
      certificatesUrl: parmas.certificatesUrl,
      name: parmas.name
    }).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: '认证成功'
        })
        getUserInfo()
      }
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '认证失败'
    })
  }
}

// 姓名的校验规则函数
//@ts-ignore
const validateName = (rule: any, value: any, callback: any) => {
  let reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的姓名'))
  }
}
//@ts-ignore
// 证件号码的校验规则函数
const validateCertificatesNo = (rule: any, value: any, callback: any) => {
  // 户口本的正则表达式
  // 身份证的正则表达式 
  let regHkb = /^\d{9}$/;
  let regSfz = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
  if(regSfz.test(value) || regHkb.test(value)) {
    callback()
  }else{
    callback(new Error('请输入正确的证件号'))
  }
}
//@ts-ignore
// 证件类型的校验规则函数
const validateCertificatesType = (rule: any, value: any, callback: any) => {
  if(value=='10'||value=='20'){
    callback()
  }else{
    callback(new Error('请选择正确的证件类型'))
  }
}
//@ts-ignore
// 证件照片的校验规则函数 因为 upload 不属于表单元素所以无法正常触发表单验证 需要用到 form.value.validate() 方法 在提交的时候手动触发验证
const validateCertificatesUrl = (rule: any, value: any, callback: any) => {
  if(parmas.certificatesUrl){
    callback()
  }else{
    callback(new Error('请上传证件照'))
  }
}

// 自定义表单校验rules 方法
const rules = {
  certificatesNo: [
    {
      required: true,
      validator: validateCertificatesNo,
    }
  ],
  certificatesType: [
    {
      required: true,
      validator: validateCertificatesType,
    }
  ],
  certificatesUrl: [
    {
      required: true,
      validator: validateCertificatesUrl,
    }
  ],
  name: [
    {
      required: true,
      trigger: 'change',
      validator: validateName,
    }
  ]
}

</script>
<style scoped lang="scss">
::v-deep(.el-upload-dragger) {
  height: 146px;
  padding: 8px;
}

::v-deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  width: 200px;
}

::v-deep(.el-card.is-always-shadow) {
  min-height: 500px;
}

.certification {
  .box-card {
    .tip {
      margin: 15px 0 40px 0;
      display: flex;
      justify-content: center;

      p {
        margin-left: 2px;
        font-size: 15px;
        color: #7f7f7f;
      }
    }

    .card-header {
      span {
        font-weight: 600;
        font-size: 20px;
      }
    }

    .formInfo {
      display: flex;
      justify-content: center;
    }
  }

}
</style>
