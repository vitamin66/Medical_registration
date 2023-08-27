<template>
  <div class="">
    <DetailOrder v-if="$route.query.orderId" />
    <AllOrder  v-else/>
  </div>
</template>

<script setup lang="ts">
import AllOrder from "./allOrder/index.vue"
import DetailOrder from "./detailOrder/index.vue"
import {useRoute} from 'vue-router'
let $route = useRoute()
</script>

<style scoped lang="scss"></style>
