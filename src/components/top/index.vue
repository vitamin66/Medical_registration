<template>
  <div class="top">
    <div class="content">
      <!-- 左边部分 -->
      <div class="left" @click="goHome">
        <div class="logomsg">
          <img src="../..//assets/images/logo.png" />
          <span class="text">尚医通 预约挂号统一平台</span>
        </div>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <a href="#"><span>帮助中心</span></a>
        <a href="#" class="login" v-if="!userLoginStore.phoneLoginInfo.name"><span @click="showDailog">登录/注册</span></a>
        <el-dropdown class="login" v-else>
          <span class="el-dropdown-link">
            {{ userLoginStore.phoneLoginInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
// 引入仓库 取出数据用于控制login 组件下的登录控件的显示隐藏
import useUserStore from '../../store/modules/user.ts'
let userLoginStore = useUserStore()
// 引入路由
import { useRouter } from "vue-router";
const $router = useRouter()
// 点击logo和文字跳转到主页路由
function goHome() {
  $router.push({ path: '/home' })
}
function showDailog() {
  userLoginStore.isShowLoginDialog = true
}
// 退出登录按钮的回调
const logout = () => {
  // 通知pinai仓库清除数据并要重新定向到主页
  userLoginStore.clearUserInfo()
  // 重新定向到主页
  $router.push({ path: '/home' })
}

// 点击对应的选项跳转到对应的路由
const goUser = (path:string) => {
  $router.push({path})
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.top {
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 100%;

    .left {
      img {
        width: 50px;
        height: 50px;
      }

      .logomsg {
        width: 320px;
        height: 70px;
        display: flex;
        align-items: center;
        color: #4490f1;

        .text {
          font-size: 22px;
          margin-left: 15px;
        }
      }
    }

    .left:hover {
      cursor: pointer;
    }

    .right {
      display: flex;
      line-height: 20px;

      a {
        color: #666;
        font-size: 14px;
      }

      a:hover {
        color: #4490f1;
      }

      .login {
        margin-left: 20px;
        span{
          line-height: 20px;
        }
      }
    }
  }
}
</style>

