<template>
    <div class="step2">
        <!-- 标题区域 -->
        <div class="title">
            <h1>确认挂号信息</h1>
        </div>
        <!-- 就诊人信息区域 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请点击选择就诊人</span>
                    <el-button type="success" @click="goAddUser">
                        <svg t="1692672870996" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4014" width="16" height="16">
                            <path
                                d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h0.1c3 0 4.4-3.6 2.2-5.6-30.8-27.6-65.6-49.7-103.7-65.8-0.4-0.2-0.8-0.3-1.2-0.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.7 18.9-84.8 46-119.3 80.6-34.5 34.5-61.5 74.7-80.4 119.5C147.9 794.5 138 841 137 888.8c-0.1 4.5 3.5 8.2 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1 2.5 1.5 5.5 1.7 8.1 0.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4-32.4-32.5-50.3-75.7-50.3-121.6 0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4c32.4 32.5 50.3 75.7 50.3 121.6 0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                                p-id="4015" fill="#ffffff"></path>
                        </svg>
                        <span>添加就诊人</span>
                    </el-button>
                </div>
            </template>
            <!-- 就诊人具体的信息  -->
            <Visitor :visitorData="visitorData" @getIsConfirm="getIsConfirm" />
        </el-card>
        <!-- 医生的具体信息 -->
        <el-card class="box-card2">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 信息表格 -->
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期:
                        </div>
                    </template>
                    {{ docInfo?.workDate }} {{ docInfo.param?.dayOfWeek }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院:
                        </div>
                    </template>
                    {{ docInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室:
                        </div>
                    </template>
                    {{ docInfo.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名:
                        </div>
                    </template>
                    {{ docInfo?.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称:
                        </div>
                    </template>
                    {{ docInfo?.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长:
                        </div>
                    </template>
                    {{ docInfo?.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医事服务费:
                        </div>
                    </template>
                    <span style="color:red">{{ docInfo?.amount }}元</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号按钮 -->
        <div class="confirmBtn">
            <el-button type="primary" class="btn" @click="confirm" :disabled="confirmBtn == -1">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Visitor from "./visitor.vue"
import axios from '../../../utils/request'
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
// 暂时没有医生id数据
let $route = useRoute()
// 创建路由器对象
let $router = useRouter()

//储存就诊人信息
let visitorData = ref<any>([])

// 存储医生的信息
let docInfo = ref<any>({})

// 用于存储创建订单后的订单号
// let orderId = ref<string>('')
onMounted(() => {
    // 发请求拿就诊人数据
    getUserVisitorData()
    // 发请求拿医生数据
    getdocInfo()
})
// 拿就诊人信息的请求函数
const getUserVisitorData = () => {
    axios.get(`/api/user/patient/auth/findAll`).then((res: any) => {
        if (res.code = 200) {
            visitorData.value = res.data
        }
    })
}
// 拿医生信息的请求函数
const getdocInfo = () => {
    axios.get(`/api/hosp/hospital/getSchedule/${$route.query.docId}`).then((res: any) => {
        if (res.code === 200) {
            docInfo.value = res.data
        }
    })
}

// 存储当前就诊人的索引值
let confirmBtn = ref<number>(-1)
// 拿到当前选择的就诊人索引值
const getIsConfirm = (isConfirm: number) => {
    confirmBtn.value = isConfirm
}

// 存储生成的订单号 并携带参数进行路由跳转
let orderId = ref<number>()
// 点击确认挂号按钮的回调 (跳转到订单路由 并因为有id参数所以要展示订单详情的结构)
const confirm = async () => {
    /* 
       /${docInfo.value.hoscode}/${docInfo.value.hosScheduleId}/${visitorData.value.id}
       {
        hoscode: docInfo.value.hoscode,
        scheduleId: docInfo.value.hosScheduleId,
        patientId: visitorData.value.id,
    }
    */
    // 这里后期有就诊人信息后再来发请求  需要三个参数 医院编号 医生的id 就诊人的 id  然后把下面的 431 进行替换
    // 接口地址 /api/order/orderInfo/auth/submitOrder/{hoscode}/{scheduleId}/{patientId}
    await axios.post(`/api/order/orderInfo/auth/submitOrder/${docInfo.value.hoscode}/${docInfo.value.id}/${visitorData.value[confirmBtn.value].id}`,).then((res: any) => {
        if (res.code === 200) {
            orderId.value = res.data
        }
    })
    $router.push({ path: '/user/order', query: { orderId: orderId.value } })
}

// 在挂号预约组件中点击添加就诊人按钮的回调
const goAddUser = () =>{
    // 需要进行路由跳转并且场景得是新增表单的场景
    $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style scoped lang="scss">
.step2 {
    min-height: 1000px;

    .title {
        margin: 60px 0;

        h1 {
            font-size: 25px;
            font-weight: 900;
        }
    }

    .box-card2 {
        .margin-top {
            .cell-item {
                text-align: center;
            }
        }
    }

    .confirmBtn {
        margin: 30px 0;
        display: flex;
        justify-content: center;

        .btn {
            width: 150px;
            height: 45px;
        }
    }

    ::v-deep(.el-card__header .card-header) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
