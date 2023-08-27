<template>
  <div>
    <!-- 主页的轮播图区域 (组件) -->
      <Carousel />

    <!-- 主页的搜索区域 (组件)-->
      <Search />

    <!-- 主页的详细信息区域 (组件) -->
    <Content/>

  </div>
</template>

<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Content from "./content/index.vue";
</script>

<style scoped lang="scss"></style>
