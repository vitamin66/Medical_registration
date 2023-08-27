<template>
  <div class="bottom">
    <!-- 内容区域 -->
    <div class="content">
      <!-- 左边 -->
      <div class="left">
        <span class="record">京ICP备13018369号</span>
        <span>电话挂号010-56253825</span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <a href="#">联系我们</a>
        <a href="#">合作伙伴</a>
        <a href="#">用户协议</a>
        <a href="#">隐私协议</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #FAFAFA;
  .content {
    width: 1200px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #666666;
    }
    .record {
      margin-right: 30px;
      color: #bbbbbb;
    }
    .right {
        a{
            text-decoration: none;
            font-size: 12px;
            color: #666;
            margin-left: 30px;
        }
        a:hover{
            color: #4490f1;
        }
    }
  }
}
</style>