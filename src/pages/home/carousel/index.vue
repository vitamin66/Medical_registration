<template>
  <div class="carousel">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/web-banner-1.png">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
    .carousel {
        ::v-deep(.el-carousel img){
            height: 350px;
        }
    }
</style>
