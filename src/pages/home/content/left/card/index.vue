<template>
    <el-card class="box-card mouse-style" shadow="hover" @click="goDetail">
        <div class="content">
            <!-- 卡片左边区域 -->
            <div class="left">
                <!-- 医院标题 -->
                <div class="title">
                    {{ item.hosname }}
                </div>
                <!-- 医院其他信息 -->
                <div class="other">
                    <span class="level">
                        <i class="level-icon"><el-icon>
                                <Histogram />
                            </el-icon></i>
                        <span>{{ item.param.hostypeString }}</span>
                    </span>
                    <span class="tip">
                        <i class="hop-icon"><el-icon>
                                <AlarmClock />
                            </el-icon></i>
                        每天{{ item.bookingRule?.releaseTime }}放号
                    </span>
                </div>
            </div>
            <!-- 卡片右边区域 -->
            <div class="right">
                <!-- 医院图片 -->
                <img :src="`data:image/jpeg;base64, ${item.logoData}`" class="logo">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import {
    Histogram,
    AlarmClock
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
let props = defineProps(['item'])


// 点击医院卡片跳转相应路由
function goDetail() {
    $router.push({ path: '/hospital/register',query:{hoscode:props.item.hoscode}})
}
</script>

<style scoped lang="scss">
.mouse-style:hover {
    cursor: pointer;
}

.content {
    display: flex;
    justify-content: space-between;

    .right {
        .logo {
            width: 50px;
            height: 50px;
        }
    }

    .left {
        .title {
            margin-bottom: 25px;
        }

        .title:hover {
            font-weight: 800;
        }

        .other {
            display: flex;

            color: #999999;
            font-size: 15px;

            .level {
                display: flex;
                margin-right: 140px;
            }

            .tip {
                display: flex;
            }
        }
    }
}
</style>
