<template>
  <div class=""></div>
</template>

<script setup lang="ts">
// 用户扫码授权登录成功后 后端服务器会把用户信息和 token 给我们包含在了重定向的 路由的 query参数里
import {useRoute}  from 'vue-router'
const $route = useRoute()
// 拿到用户信息后要存到本地
localStorage.setItem('userInfo',JSON.stringify($route.query))
// 只要用户扫码成功了会执行这个组件里的代码 需要把扫码成功后展示的页面隐藏掉
let html:any = document.querySelector('html')
html.style.display = 'none'

</script>

<style scoped lang="scss"></style>
