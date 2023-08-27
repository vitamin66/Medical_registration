<template>
  <div class="content">
    <!-- 主题内容左侧区域 -->
    <Left/>
     <!-- 主题内容右侧区域 -->
    <Right/>
  </div>
</template>

<script setup lang="ts">
import Left from './left/index.vue'
import Right from './right/index.vue'
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
}
</style>
