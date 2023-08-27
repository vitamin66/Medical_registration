<template>
  <div class="sift">
    <!-- 头部的医院等级以及地区筛选 -->
    <Top @getLevel="getLevel" @getRegion="getRegion" />
    <!-- 医院卡片的详细展示区域 -->
    <div class="hospital-card" v-if="hospotals.length > 0">
      <Card v-for="(item, index) in hospotals" :key="index" class="item" :item="item" />
    </div>
    <el-empty description="暂无数据" v-else />
    <!-- 底部的分页区域 -->
    <div class="pagination" v-if="hospotals.length > 0">
      <el-pagination v-model:current-page="PageCurrent" v-model:page-size="PageSize" :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, next, jumper" :total="17" @current-change="currentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './card/index.vue'
import Top from './top/index.vue'
// 引入 vue身上的组合式 api
import { ref, onMounted } from 'vue'
// 引入二次封装的 axios
import axios from '../../../../utils/request'
// 引入 ts数据类型约束
import { Content } from '../../../../api/home/type.ts'
// 引入element-plus上的 提示插件
import { ElMessage } from 'element-plus';
// 当前默认页数 为 1
let PageCurrent = ref<number>(1)
// 默认显示条数 为 10 
let PageSize = ref<number>(10)
// 储存医院卡片里的详细数据
let hospotals = ref<Content>([])
// 医院等级的 value 值
let hostype = ref<string>('')
// 医院地区的 value 值
let districtCode = ref<string>('')
onMounted(() => {
  getHospital()
})

// 分页切换时触发的回调
function currentChange() {
  // 再次发请求拿数据
  getHospital()
}
// 获取医院数据的接口函数 
function  getHospital() {
  axios.get(`/api/hosp/hospital/${PageCurrent.value}/${PageSize.value}?hostype=${hostype.value}&districtCode=${districtCode.value}`).then((res: any) => {
    if (res.code === 200) {
      hospotals.value = res.data.content
    } else {
      ElMessage({
        type: 'error',
        message: '请求医院信息错误'
      })
    }

  })
}

// 子传给父的等级地区数据自定义事件回调函数
function getLevel(LevelValue: string) {
  // 拿到数据后存储起来
  hostype.value = LevelValue
  // 再次调用发请求的函数
  getHospital()
}

function getRegion(regionValue: string) {
  // 拿到数据后存储起来
  districtCode.value = regionValue
  // 再次调用发请求的函数
  getHospital()
}
</script>

<style scoped lang="scss">
.sift {
  width: 1000px;

  .hospital-card {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 48%;
      margin: 5px 10px;
    }
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
