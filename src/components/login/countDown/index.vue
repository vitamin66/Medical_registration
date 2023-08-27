<template>
  <div>
    <span>获取验证码({{ count }})</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps(['falg'])
let $emit = defineEmits(['getFalg'])
let count = ref<number>(5)
let timer: any
watch(() => props.falg, () => {
  clearInterval(timer)
  timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
      clearInterval(timer)
      $emit('getFalg',false)
    }
  }, 1000)
}, { immediate: true })


</script>

<style scoped lang="scss"></style>
