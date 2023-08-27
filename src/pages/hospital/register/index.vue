<template>
  <div class="register">
    <!-- 上面医院名称和等级区域 -->
    <div class="top">
      <div class="name">{{ hosDetail.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1692266381480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4061" width="16" height="16">
          <path
            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
            p-id="4062" fill="#2c2c2c"></path>
        </svg>
        <span>{{ hosDetail.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <!-- 具体内容展示区域 -->
    <div class="content">
      <!-- 医院logo区域 -->
      <div class="logo">
        <img :src="`data:image/jpeg;base64,` + hosDetail.hospitalInfo.hospital?.logoData">
      </div>
      <!-- 医院message区域 -->
      <div class="message">
        <!-- 上半部分区域 -->
        <div class="rules">
          <h3>挂号规则</h3>
          <p class="time-msg">预约周期:<span>{{ hosDetail.hospitalInfo.bookingRule?.cycle }}天</span>放号时间:<span>{{
            hosDetail.hospitalInfo.bookingRule?.releaseTime }}</span>挂停时间:<span>{{
    hosDetail.hospitalInfo.bookingRule?.stopTime }}</span></p>
          <p>具体地址: &nbsp;<span>{{ hosDetail.hospitalInfo.hospital?.param.fullAddress }}</span></p>
          <p>规划路线:<span>{{ hosDetail.hospitalInfo.hospital?.route }}</span></p>
          <p>退号时间:就诊前一工作日<span>{{ hosDetail.hospitalInfo.bookingRule?.quitTime }}</span>前取消</p>
        </div>
        <!-- 下半部分区域 -->
        <div class="tip">
          <h3>医院预约规则</h3>
          <p>{{ count = hosDetail.hospitalInfo.bookingRule?.rule.length }} 、<span
              v-for="(item, index) in hosDetail.hospitalInfo.bookingRule?.rule" :key="index">{{ item }}</span></p>
        </div>
      </div>
    </div>
    <!-- 医院科室展示区域 -->
    <div class="department">
      <!-- 左边导航区域 -->
      <div class="leftNav">
        <ul>
          <li :class="{ active: isActive === index1 }" @click="changeColor(index1)"
            v-for="(item1, index1) in hosDetail.hospitalDepartment" :key="index1">{{
              item1.depname }}</li>
        </ul>
      </div>
      <!-- 右边展示区域 -->
      <div class="departmentInfo">
        <div class="departmentMsg" v-for="(item2, index2) in hosDetail.hospitalDepartment" :key="index2">
          <h2 class="departmentTitle">{{ item2.depname }}</h2>
          <div class="detail">
            <p @click="showDailog(item3)" v-for="(item3, index) in item2.children" :key="index">{{ item3.depname }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
// 引入仓库数据 并进行展示
import useHospitalDetail from '../../../store/modules/hospitalDetail'
let hosDetail = useHospitalDetail()
// 引入仓库 取出数据用于控制login 组件下的登录控件的显示隐藏
// import useUserStore from '../../../store/modules/user'
// let userLoginStore = useUserStore()

let count = ref<any>('')
// 动态添加 li 的高亮效果
let isActive = ref<number>(0)
// li的点击事件 点击时要高亮并且 右侧要滚到对应的位置
function changeColor(index: number) {
  isActive.value = index
  let allH2 = document.querySelectorAll('.departmentTitle')
  allH2[index].scrollIntoView({
    behavior: 'smooth'
  })

}

// 创建路由器和路由对象
let $router = useRouter()
let $route = useRoute()

// 点击每一个科室门诊跳转到对应的挂号路由组件
function showDailog(item: any) {
  // 没有登录时点击每一个科室门诊会弹出登录框 最后再来做鉴权 暂时先取消这个功能
  // userLoginStore.isShowLoginDialog = true
  // 点击小门诊的时候跳转到对应的详细挂号路由页面 并把医院编号和门诊编号带过去
  $router.push({ path: '/hospital/step1', query: { hoscode: $route.query.hoscode, depcode: item.depcode } })

}
</script>

<style scoped lang="scss">
// 公告类
.active {
  color: #7eabff;
  border-left: 2px #7eabff solid;
  background-color: #fff !important;
}

.register {
  .top {
    display: flex;

    .name {
      margin-right: 20px;
      font-size: 22px;
    }

    .level {
      display: flex;
      padding-top: 4px;
      color: #7f7f7f;
    }
  }

  .content {
    display: flex;
    margin-top: 30px;

    .logo {
      flex: 2;

      img {
        width: 150px;
        height: 150px;
      }
    }

    .message {
      flex: 8;

      .rules {
        color: #7f7f7f;

        p {
          margin: 6px 0;
          font-size: 15px;
          line-height: 20px;
        }

        h3 {
          color: #000;
          margin-bottom: 20px;
        }

        .time-msg {
          span {
            margin: 0 10px;
          }
        }
      }

      .tip {
        color: #7f7f7f;

        h3 {
          color: #000;
          margin-bottom: 20px;
        }

        p {
          margin: 6px 0;
          font-size: 15px;
          line-height: 20px;

        }
      }
    }
  }

  .department {
    display: flex;
    margin-top: 35px;

    .leftNav {
      ul {
        li {
          width: 90px;
          background-color: #e0e0e0;
          text-align: center;
          line-height: 50px;
        }

        li:hover {
          color: #7eabff;
        }
      }
    }

    .departmentInfo {
      flex: 7;
      overflow: auto;
      height: 650px;

      // 隐藏滚动条
      &::-webkit-scrollbar {
        display: none;
      }

      .departmentMsg {
        background-color: #fff;

        .departmentTitle {
          background-color: #e0e0e0;
          line-height: 30px;
          padding-left: 10px;
        }

        .detail {
          display: flex;
          flex-wrap: wrap;
          padding-left: 20px;

          p {
            width: 33%;
            margin: 16px 0;
          }
        }
      }
    }
  }
}
</style>
