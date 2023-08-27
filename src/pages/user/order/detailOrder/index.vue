<template>
  <div class="detail">
    <!-- 最大的卡片信息区域 -->
    <el-card class="box-card">
      <!-- 卡片标题区域 -->
      <template #header>
        <div class="card-header">
          <span style="font-weight: 900;color: #7f7f7f; font-size: 20px;">挂号详情</span>
        </div>
      </template>
      <!-- 身体部分的头部 -->
      <div class="bodyTop">
        <!-- 左边支付标签 -->
        <div class="pay">
          <el-tag class="ml-2" type="primary">
            <div class="tag">
              <svg t="1692757664587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4064" width="16" height="16">
                <path
                  d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z"
                  p-id="4065" fill="#1296db"></path>
              </svg>
              <span>{{ orderDetailData.param?.orderStatusString }}</span>
            </div>
          </el-tag>
        </div>
        <!-- 右边二维码挂号区域 -->
        <div class="qrCode">
          <img src="../../../../assets/images/code_login_wechat.png">
          <div class="text">
            <p>微信关注“北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <div class="body">
        <!-- 左边就诊人信息区域 -->
        <div class="left">
          <!-- 就诊人信息区域 -->
          <el-descriptions :column="1" border>
            <el-descriptions-item label="就诊人信息">{{ orderDetailData?.patientName }}</el-descriptions-item>
            <el-descriptions-item label="就诊日期">{{ orderDetailData?.reserveDate }}</el-descriptions-item>
            <el-descriptions-item label="就诊医院" :span="2">{{ orderDetailData?.hosname }}</el-descriptions-item>
            <el-descriptions-item label="就诊科室">{{ orderDetailData?.depname }}</el-descriptions-item>
            <el-descriptions-item label="医生职称">{{ orderDetailData?.title }}</el-descriptions-item>
            <el-descriptions-item label="医事服务费"><span style="color: red; font-weight: 700;">{{ orderDetailData?.amount
            }}元</span></el-descriptions-item>
            <el-descriptions-item label="挂号单号">{{ orderDetailData?.outTradeNo }}</el-descriptions-item>
            <el-descriptions-item label="挂号时间">{{ orderDetailData?.createTime }}</el-descriptions-item>
          </el-descriptions>
          <!-- 支付/取消按钮区域  -->
          <div class="btn" v-if="orderDetailData.orderStatus == 0 || orderDetailData.orderStatus == 1">
            <el-popconfirm title="确定取消?" @confirm="cancelOrder">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <!-- 支付按钮在支付完成后还需要单独隐藏 -->
            <el-button type="primary" v-if="orderDetailData.orderStatus == 0" @click="changePay">支付</el-button>
          </div>
        </div>
        <!-- 右边注意事项区域 -->
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>注意事项</span>
              </div>
            </template>
            <div class="content">
              <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
              <p style="color: red">
                2.【取号】就诊当天需在{{ orderDetailData?.fetchTime }}
                在医院取号，未取号视为爽约，该号不退不换；
              </p>
              <p>
                3.【退号】在前{{ orderDetailData?.quitTime }}可在线退号 ，逾期将不可办理退号退费；
              </p>
              <p>
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
              </p>
              <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
    <!-- 支付对话框区域 -->
    <el-dialog @close="close" v-model="isPay" title="微信支付" width="500px">
      <!-- 二维码区域 -->
      <div class="qrcode">
        <img :src="payUrlData">
        <p>打开微信扫一扫</p>
        <p>扫码支付</p>
      </div>
      <!-- footer取消支付区域 -->
      <template #footer>
        <el-button @click="cancelPay">取消支付</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import axios from '../../../../utils/request'
import { useRoute } from 'vue-router'
import { onMounted, ref } from "vue"
import { ElMessage } from 'element-plus';
// 引入 QRCode 插件将 支付的二维码 字符串转换成 url地址
// @ts-ignore
import QRCode from 'qrcode'
// 创建路由对象
let $route = useRoute()
//当前组件挂载完毕就根据订单id发请求拿到 详细订单的数据并展示到页面
onMounted(() => {
  // 发请求拿数据
  getOrderDetail()
})
// 把订单数据存进去
let orderDetailData = ref<any>({})
// 用于控制是否显示支付框的响应式数据
let isPay = ref<boolean>()


// 根据订单id发请求 拿到订单详细数据
const getOrderDetail = () => {
  axios.get(`/api/order/orderInfo/auth/getOrderInfo/${$route.query.orderId}`).then((res: any) => {
    if (res.code === 200) {
      orderDetailData.value = res.data
    }
  })
}

// 点击取消订单发请求
const cancelOrder = async () => {
  await axios.get(`/api/order/orderInfo/auth/cancelOrder/${$route.query.orderId}`).then((res: any) => {
    if (res.code === 200) {
      // 取消成功 需要再次拿数据展示新数据到页面      
      getOrderDetail()
      ElMessage({
        type: 'success',
        message: '取消成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: '取消失败'
      })
    }
  })

}
// 存储定时器的引用
let timer = ref<any>()

// 存储支付接口返回的数据 (二维码字符串)
let payUrlData = ref<any>({})

// 点击支付按钮  根据订单id发请求 生成二维码 并且弹出支付框 
const changePay = async () => {
  // 根据订单id 发请求拿到支付码的字符串信息 并使用 Qrcode插件 转换成imgUrl地址
  await axios.get(`/api/order/weixin/createNative/${$route.query.orderId}`).then(async (res: any) => {
    if (res.code === 200) {
      payUrlData.value = await QRCode.toDataURL(res.data.codeUrl)
    }
  })
  // 打开支付框
  isPay.value = true
  // 继续长论询判断是否支付成功 支付成功就要关闭支付框
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    axios.get(`/api/order/weixin/queryPayStatus/${$route.query.orderId}`).then((res: any) => {
      if (res.data) {
        isPay.value = false
        ElMessage({
          type: 'success',
          message: '支付成功'
        })
        getOrderDetail()
        clearInterval(timer.value)
      }
    })
  }, 2000)
}

// 取消支付按钮的回调
const cancelPay = () => {
  isPay.value = false
  clearInterval(timer.value)
}

//点击叉叉关闭支付框也需要停止定时器
const close = () => {
  clearInterval(timer.value)
}
</script>

<style scoped lang="scss">
.detail {
  ::v-deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell){
    text-align: center;
  }
  .box-card {
    .bodyTop {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;

      .pay {
        display: flex;
        align-items: center;

        .tag {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-left: 5px;
          }
        }
      }

      .qrCode {
        display: flex;

        img {
          width: 40px;
          height: 40px;
        }

        .text {
          margin-left: 8px;
          font-size: 15px;
        }
      }
    }

    .body {
      display: flex;
      margin: 20px 0;

      .left {
        flex: 4;
        margin-right: 20px;

        .btn {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
      }

      .right {
        flex: 6;

        .content {
          p {
            margin-bottom: 7px;
            line-height: 21px;
            font-size: 15px;
          }
        }
      }
    }
  }

  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    P {
      line-height: 25px;
      font-size: 15px;
    }
  }
}
</style>
