<template>
  <div class="allOrder" style="padding-bottom: 100px;">
    <!-- 卡片区域 -->
    <el-card class="box-card" style="margin-top: 40px;">
      <template #header>
        <div class="card-header">
          <span style="font-size: 20px;">挂号订单</span>
        </div>
      </template>
      <!-- 表单下拉框区域 -->
      <el-form :inline="true">
        <el-form-item label="就诊人">
          <el-select placeholder="请选择就诊人" v-model="patientId" @change="changUserOrOrderStatus">
            <el-option label="所有就诊人" value=""></el-option>
            <el-option :label="item.name" v-for="item in patientData" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="changUserOrOrderStatus">
            <el-option label="所有订单" value=""></el-option>
            <el-option v-for="(item, index) in orderList" :key="index" :label="item.comment" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- table表格区域 -->
      <el-table stripe style="width: 100%;margin-bottom: 30px;" border :data="orderListData">
        <el-table-column label="就诊时间" prop="reserveDate" />
        <el-table-column label="医院" prop="hosname" />
        <el-table-column label="科室" prop="depname" />
        <el-table-column label="医生" prop="title" />
        <el-table-column label="服务费" prop="amount" />
        <el-table-column label="就诊人" prop="patientName" />
        <el-table-column label="订单状态" prop="param.orderStatusString" />
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="text" @click="goOrderDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器区域 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next, jumper,->,sizes,total," :total="total" @current-change="changePage"
        @size-change="changeSize" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import axios from '../../../../utils/request'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由器实例
let $router = useRouter()
// 组件挂载完毕就发一次请求拿到订单列表数据
onMounted(() => {
  // 获取订单列表数据的方法
  getUserOrderData()
  // 获取当前账号所有就诊人数据的方法
  getPatientData()
  // 获取订单状态的方法
  getOrderList()
})

// 分页器默认显示第一页
let pageNo = ref<number>(1)
// 默认一页展示 十条数据
let pageSize = ref<number>(10)
// 存储订单列表的数据
let orderListData = ref<any>([])
// 存储总数据条数
let total = ref<number>(0)
// 存储当前账号就诊人的数据
let patientData = ref<any>([])
// 存储就诊人 id
let patientId = ref<any>('')
// 存储订单列表
let orderList = ref<any>([])
// 存储订单 status
let orderStatus = ref<any>('')
// 获取订单列表数据的方法
const getUserOrderData = () => {
  axios.get(`/api/order/orderInfo/auth/${pageNo.value}/${pageSize.value}?patientId=${patientId.value}&orderStatus=${orderStatus.value}`).then((res: any) => {
    if (res.code == 200) {
      // 存储订单列表的数据
      orderListData.value = res.data.records
      // 存储总数据条数
      total.value = res.data.total
    }

  })
}

// 切换分页时触发的钩子
const changePage = (pageN: number) => {
  // 拿到点击后的页码值 赋值然后再次重新发起请求
  pageNo.value = pageN
  getUserOrderData()
}

// 切换页面显示多少条数据的时候触发的钩子
const changeSize = (pageS: number) => {
  // 拿到点击后的显示条数值 赋值然后再次重新发起请求
  pageSize.value = pageS
  getUserOrderData()
}

// 点击详情按钮去订单详情页 需要携带订单的id
const goOrderDetail = (row: any) => {
  $router.push({ path: '/user/order', query: { orderId: row.id } })
}

// 获取当前账号所有的就诊人数据
const getPatientData = () => {
  axios.get(`/api/user/patient/auth/findAll`).then((res: any) => {
    if (res.code == 200) {
      patientData.value = res.data
    }
  })
}

// 获取订单的状态
const getOrderList = () => {
  axios.get(`/api/order/orderInfo/auth/getStatusList`).then((res:any) =>{
    if(res.code == 200) {
      orderList.value = res.data
    }
  })
}

// 切换就诊人和订单列表的时候触发的事件回调
const changUserOrOrderStatus = () =>{
  getUserOrderData()
}
</script>

<style scoped lang="scss"></style>
