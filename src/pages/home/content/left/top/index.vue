<template>
    <!-- 等级和地区筛选区域 -->
    <div class="top">
        <p class="title">医院</p>
        <div class="level">
            <ul>
                <li>等级：</li>
                <li :class="{ active: activeFlag === '' }" @click="changeLevelActive('')">全部</li>
                <li v-for="item in levelArr" :key="item.value" :class="{ active: activeFlag === item.value }"
                    @click="changeLevelActive(item.value)">{{ item.name }}</li>
            </ul>
        </div>
        <div class="region">
            <ul>
                <li>地区：</li>
                <li :class="{ active: activeRegion === '' }" @click="changeRegionActive('')">全部</li>
                <li v-for="item in regionArr" :key="item.value" :class="{ active: activeRegion === item.value }"
                    @click="changeRegionActive(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>
<!-- 给组件命名的script标签 -->
<script lang="ts">
export default {
    name: 'LevelAndRegion'
}
</script>

<script setup lang="ts">
// 引入二次封装axios
import { ElMessage } from 'element-plus';
import axios from '../../../../../utils/request'

import { onMounted, ref } from "vue"
// 服务器响应回来的等级和地区数据
let levelArr = ref<any>([])
let regionArr = ref<any>([])
// 等级区域的value数据
let activeFlag = ref<string>('')
// 地区区域的value数据
let activeRegion = ref<string>('')
// 挂载完毕就显示医院数据
onMounted(() => {
    // 医院等级数据请求
    axios.get(`/api/cmn/dict/findByDictCode/Hostype`).then((res: any) => {
        if (res.code === 200) {
            levelArr.value = res.data
        } else {
            ElMessage({
                type: 'error',
                message: '请求医院等级错误'
            })
        }
    })
    // 医院地区数据请求
    axios.get(`/api/cmn/dict/findByDictCode/beijin`).then((res: any) => {
        if (res.code === 200) {
            regionArr.value = res.data
        } else {
            ElMessage({
                type: 'error',
                message: '请求医院地区错误'
            })
        }
    })
})

// 等级和地区区域的点谁高亮效果函数 并存储value值 再次发请求
// 声明接收 getLevel 自定义事件
const $emit = defineEmits(['getLevel', 'getRegion'])
function changeLevelActive(value: string) {
    // 把每个等级的 value 储存起来
    activeFlag.value = value
     // 触发自定义事件并传递参数
    $emit('getLevel', activeFlag.value)
}
// 声明接收 getRegion 自定义事件
function changeRegionActive(value: string) {
    // 把每个地区的 value 储存起来
    activeRegion.value = value
    // 触发自定义事件并传递参数
    $emit('getRegion', activeRegion.value)
}

</script>

<style scoped lang="scss">
.top {
    .title {
        margin-bottom: 20px;
        font-weight: 700;
    }

    .active {
        color: #4490f1;
        // padding-right: 10px;
    }

    ul {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        // align-items: center;
        color: #666;

        li {
            margin-right: 25px;
            margin-bottom: 20px;
        }

        li:nth-child(1) {
            font-size: 15px;
        }

        li:nth-child(7) {
            margin-right: 25px;
        }

        li:hover {
            color: #4490f1;
            cursor: pointer;
        }
    }

    .region {
        ul {
            padding-right: 120px;

            li:nth-child(7) {
                margin-right: 25px;
            }

            li:nth-child(12) {
                margin-left: 70px;
            }
        }

    }

}
</style>
