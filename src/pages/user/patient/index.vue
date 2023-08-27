<template>
  <!-- 就诊人管理大卡片区域 -->
  <div class="patient">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="success" round :icon="User" @click="addPatient">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人小卡片区域 (2选1) -->
      <div class="patientVisitor" v-if="formOrCard == 0">
        <!-- 复用就诊人卡片组件 -->
        <Visitor :visitorData="visitorData" @changePatient="changePatient" @deleteUser="deleteUser" />
      </div>
      <!-- 添加就诊人或修改就诊人表单区域 (2选1) -->
      <div class="form" v-if="formOrCard == 1">
        <el-divider content-position="left">就诊人信息</el-divider>
        <!-- 就诊人信息表单 -->
        <el-form style="width: 60%; margin: 10px auto;">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入就诊人姓名" v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="params.certificatesType">
              <el-option :label="item.name" v-for="item in documentsType" :value="item.value" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="params.sex">
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" v-model="params.birthdate" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" v-model="params.phone"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <!-- 建档信息表单 -->
        <el-form style="width: 60%; margin: 10px auto;">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="params.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="params.isInsure">
              <el-radio :label="0">自费</el-radio>
              <el-radio :label="1">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址">
            <el-cascader :props="props" v-model="params.addressSelected" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input placeholder="请输入详细地址" v-model="params.address"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <!-- 联系人信息 -->
        <el-form style="width: 60%; margin: 10px auto;" label-width="80">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入就诊人姓名" v-model="params.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="params.contactsCertificatesType">
              <el-option :label="item.name" v-for="item in documentsType" :value="item.value" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号码" v-model="params.contactsCertificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" v-model="params.contactsPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入就诊人卡片组件进行复用
import Visitor from '../../hospital/register/visitor.vue'
import {
  User,
} from '@element-plus/icons-vue'
// 级联选择器数据的 ts 类型
import { ElMessage, type CascaderProps } from 'element-plus'
import axios from '../../../utils/request';
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 创建路由对象
let $route = useRoute()
let $router = useRouter()
// 存储就诊人信息数据
let visitorData = ref<any>([])
// 用于控制卡片和表单区域的数据
let formOrCard = ref<number>(0)
// 存储证件类型数据
let documentsType = ref<any>([])

// 收集表单的数据
let params = reactive<any>({
  certificatesNo: "",
  certificatesType: "",
  name: "",
  sex: '',
  birthdate: '',
  phone: '',
  isMarry: '',
  isInsure: '',
  address: '',
  contactsName: '',
  contactsCertificatesNo: "",
  contactsPhone: '',
  contactsCertificatesType: '',
  addressSelected: [],
})

// 要获取就诊人信息传给  Visitor 组件
onMounted(() => {
  // 获取就诊人信息
  getUserInfo() 
  // 获取证件类型的方法
  getDocumentsType()
  // 如果是从挂号预约组件里点击编辑按钮跳过来的需要展示表单项 
  if ($route.query.type == 'updata') {
    formOrCard.value = 1
    axios.get(`/api/user/patient/auth/get/${$route.query.id}`).then((res: any) => {
      if (res.code == 200) {
        Object.assign(params, res.data)
      }
    })
  } else if($route.query.type == 'add'){
  // 如果是从挂号预约组件点击新增按钮跳过来的需要展示表单项
    formOrCard.value = 1
  }else{
    // 如果都不是则默认展示表格信息
    formOrCard.value = 0
  }
})
// 获取就诊人信息
const getUserInfo = () => {
  axios.get(`/api/user/patient/auth/findAll`).then((res: any) => {
    if (res.code == 200) {
      visitorData.value = res.data
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

// 级联选择器的数据
let props: CascaderProps = {
  lazy: true,
  lazyLoad(node: any, resolve: any) {
    /* 
        node 会收集到下面整理的数据 其中  node.data 包括了value 发请求时需要value还获取 城市二次的区域或县市
        lazyLoad函数会在 页面挂载完毕执行一次 以及在选择选项后还会执行
        这里的 node.data.value||86 表示 页面一挂载 node中是没有数据的 当选择第一层省份时 会收集到当前省份或直辖市的value 然后会再次发请求拿到 下面的区域或县市的数据 
    */
    axios.get(`/api/cmn/dict/findByParentId/${node.data.value || 86}`).then((res: any) => {
      // 因为服务器返回的数据字段跟级联选择器配置项需要的字段不一样所以要整理一下数据 遍历一下数组
      let cityData = res.data.map((item: any) => {
        return {
          // label表示要展示省份或直辖市的名字
          label: item.name,
          // 展示的是name 但是选中的城市收集到的是value 并且还需要它当参数来获取 二级城市区域或县市
          value: item.value,
          // 是否展示下一级 true 不展示 false为展示
          leaf: !item.hasChildren,
        }
      })
      // resolve方法可以把需要展示的数组传给组件
      resolve(cityData)
    })
  },
}

// 点击添加就诊人按钮的回调
const addPatient = () => {
  formOrCard.value = 1
  // 清空表单
  reset()
}

// 点击修改按钮就诊人的自定义事件回调
const changePatient = (item: any) => {
  // 切换场景
  formOrCard.value = 1
  // 把当前就诊人数据和进行合并
  Object.assign(params, item)
}

// 提交按钮的回调函数
const submit = async () => {
  if (params.id) {
    try {
      await axios.put(`/api/user/patient/auth/update`, params).then((res: any) => {
        if (res.code == 200) {
          if($route.query.type == 'updata') {
            $router.back()
          }
          // 提交成功后更换场景
          formOrCard.value = 0
          // 清空表单 以及 重新获取就诊人信息 
          reset()
          getUserInfo()
          // 提示用户修改成功
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    } catch (error) {
      ElMessage({
        type: 'error',
        message: '修改失败'
      })
    }

  } else {
    await axios.post(`/api/user/patient/auth/save`, params).then((res: any) => {
      if (res.code == 200) {
        // 提交成功后更换场景
        formOrCard.value = 0
        // 清空表单 以及 重新获取就诊人信息
        reset()
        getUserInfo()
        // 提示用户新增
        ElMessage({
          type: 'success',
          message: '新增成功'
        })
        if ($route.query.type == 'add') {
          $router.back()
        }
      } else {
        ElMessage({
          type: 'error',
          message: '新增失败'
        })
      }
    })
  }
}

// 重置表单的方法
const reset = () => {
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    name: "",
    sex: '',
    birthdate: '',
    phone: '',
    isMarry: '',
    isInsure: '',
    address: '',
    contactsName: '',
    contactsCertificatesNo: "",
    contactsPhone: '',
    contactsCertificatesType: '',
    addressSelected: [],
  })
}

// 点击删除按钮触发的自定事件的回调
const deleteUser = (user: any) => {
  try {
    axios.delete(`/api/user/patient/auth/remove/${user.id}`).then((res: any) => {
      if (res.code == 200) {
        getUserInfo()
        ElMessage({
          type:'success',
          message:'删除成功'
        })
      }
    })
  } catch (error) {
    ElMessage({
          type:'error',
          message:'删除失败'
        })
  }
}
</script>

<script lang="ts">
export default {
  name: 'PatientManagement'
} 
</script>
<style scoped lang="scss">
.patient {
  padding-bottom: 100px;

  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>