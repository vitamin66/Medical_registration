<template>
  <div class="discontinuation">
    <h1 class="title">{{hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
    <el-empty description="暂无数据" />
  </div>
</template>
  
<script setup lang="ts">
import useHospitalDetail from '../../../store/modules/hospitalDetail';
let hospitalStore = useHospitalDetail()
</script>
  
<style scoped lang="scss">
.discontinuation {
  padding-top: 30px;
  .title {
  font-size: 25px;
  text-align: center;
}
}

</style>
  