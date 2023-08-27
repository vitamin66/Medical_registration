<template>
    <div class="visitor">
        <el-card class="box-card" v-for="(item, index) in visitorData" :key="item.id" @click="choosePatient(index)">
            <template #header>
                <div class="card-header">
                    <span>
                        <span class="healthCare">{{ item.isInsure == 1 ? '医保' : '自费' }}</span>
                        {{ item.name }}
                    </span>
                    <div class="btn">
                        <el-button type="primary" :icon="Edit" circle @click="updataUser(item)"></el-button>
                        <el-button v-if="$route.path == '/user/patient'" type="danger" :icon="Delete" circle @click="deletePatient(item)"/>
                    </div>
                </div>
            </template>
            <!-- 具体内容区  -->
            <div class="bottom">
                <p>证件类型: <span>{{ item.param.certificatesTypeString }}</span> </p>
                <p>证件号码: <span>{{ item.certificatesNo }}</span> </p>
                <p>用户性别: <span>{{ item.sex == 0 ? '女' : '男' }}</span> </p>
                <p>出生日期: <span>{{ item.birthdate }}</span> </p>
                <p>手机号码: <span>{{ item.phone }}</span> </p>
                <p>婚姻状况: <span>{{ item.isMarry == 0 ? '未婚' : '已婚' }}</span> </p>
                <p>当前住址: <span>{{ item.address }}</span> </p>
                <p>详细地址: <span>{{ item.param.fullAddress }}</span> </p>
                <!-- 根据每个就诊人的点击事件传当前 p 索引值 赋值给 isConfirm以此来控制确认选择的展示与隐藏并在后续确认挂号中还可以使用 -->
                <div class="confirm" v-if="isConfirm === index">已选择</div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
// 创建路由实例
let $route = useRoute()
let $router = useRouter()
defineProps(['visitorData'])
let $emit = defineEmits(['getIsConfirm', 'changePatient','deleteUser'])
// 通过响应式数据来控制确认就诊人盒子
let isConfirm = ref<number>(-1)
const choosePatient = (index: number) => {
    // 这个组件在多个地方进行了复用 这个index 在第二个场景中不需要 但是第一个场景需要无法删除 只能加一个限定条件在第一个场景的下使用 
    if ($route.path == '/hospital/step2') {
        isConfirm.value = index
    }
    $emit('getIsConfirm', isConfirm.value)
}

const updataUser = (item: any) => {
    if ($route.path == '/user/patient') {
        // 就诊人管理模块点击的编辑
        // 在触发自定事件时需要传当前就诊人的数据过去
        $emit('changePatient', item)
    } else {
        // 在预约挂号模块点击的编辑按钮
        $router.push({ path: '/user/patient', query: { type: 'updata', id: item.id } })
    }
}

// 点击删除按钮的回调
const deletePatient = (user:any) =>{
    $emit('deleteUser',user)
}
</script>

<style scoped lang="scss">
.visitor {
    display: flex;
    flex-wrap: wrap;

    .box-card {
        width: 30%;
        margin: 10px 15px;

        ::v-deep(.el-card__header) {
            background-color: #e2dede;

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .healthCare {
                    display: inline-block;
                    width: 35px;
                    background-color: #fff;
                    text-align: center;
                    line-height: 20px;
                }
            }
        }

    }

    .bottom {
        position: relative;

        p {
            margin: 10px 0;
            font-size: 15px;
            color: #888888;
        }

        .confirm {
            position: absolute;
            left: 20%;
            top: 10%;
            z-index: 100;
            width: 150px;
            height: 150px;
            border: 1px dashed red;
            border-radius: 50%;
            text-align: center;
            line-height: 150px;
            opacity: 0.5;
            color: red;
            transform: rotate(35deg);
        }
    }
}
</style>
