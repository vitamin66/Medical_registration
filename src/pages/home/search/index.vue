<template>
  <div class="search">
    <el-autocomplete v-model="hospitalWord" @select="goDetail" :hide-loading="false" :fetch-suggestions="querySearch"
      clearable class="inline-input w-50" placeholder="请输入医院的名称" />
    <el-button type="primary" :icon="Search"> </el-button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Search'
}
</script>
<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import axios from '../../../utils/request'
import { ref } from 'vue'
// 引入路由器
import { useRouter } from 'vue-router'
const $router = useRouter()
// 存储一下 用户搜索出来的数据
let hospitalList = ref<any>([])
// 用户在搜索框输入的值
let hospitalWord = ref<string>('')
function querySearch(words: string, cb: any) {
  axios.get(`/api/hosp/hospital/findByHosname/${words}`).then((res: any) => {
    if (res.code === 200) {
      // 拿到数据后存储起来
      hospitalList.value = res.data
      // 整理数据把数据变成组件需要的格式
      let showData = hospitalList.value.map((item: any) => {
        return {
          value: item.hosname,
          hoscode: item.hoscode
        }
      })
      // 并且调用cb回调函数展示搜索的数据
      cb(showData)
    }
  })
}

// 点击搜索推荐项执行的函数
function goDetail(item: any) {
  // 点击搜索推荐项跳转到对应路由模块 将来需要携带 hoscode 参数
  $router.push({ path: '/hospital/register', query: {hoscode:item.hoscode} })
}


</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  ::v-deep(.el-button) {
    height: 40px;
    background-color: skyblue;
    border: 0;
  }

  ::v-deep(.el-input) {
    width: 600px;
    height: 40px;
  }

}
</style>
