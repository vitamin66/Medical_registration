<template>
  <div class="containar">
    <!-- 顶部全局组件 -->
    <top />

    <!-- 展示路由组件的区域 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 底部全局组件 -->
    <bottom />

    <!-- 登录全局组件 -->
    <login/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.containar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>