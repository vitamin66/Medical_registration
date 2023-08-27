<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="navigation">
      <el-col :span="12">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/hospital/register" @click="activeJump('/hospital/register')">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="/hospital/details" @click="activeJump('/hospital/details')">
            <el-icon>
              <document />
            </el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="/hospital/booking" @click="activeJump('/hospital/booking')">
            <el-icon>
              <svg t="1692245119197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="8597" width="16" height="16">
                <path
                  d="M512 212l48.8 12c101.6 24.8 176 117.6 176 220.8v254.4l18.4 18.4 24.8 25.6h-536l24.8-25.6 18.4-18.4V444.8c0-103.2 73.6-196.8 176-220.8l48.8-12M512 64c-36.8 0-64 30.4-64 68v30.4C320.8 192 223.2 307.2 223.2 444.8v228.8L136 763.2v44.8h752v-44.8l-87.2-89.6V444.8c0-137.6-97.6-252.8-224.8-283.2v-28.8c0-32-17.6-60.8-48-67.2-5.6-1.6-11.2-1.6-16-1.6z m88 808H424c0 49.6 38.4 88 88 88s88-38.4 88-88z"
                  p-id="8598"></path>
              </svg>
            </el-icon>
            <span>预约须知</span>
          </el-menu-item>
          <el-menu-item index="/hospital/discontinuation" @click="activeJump('/hospital/discontinuation')">
            <el-icon>
              <Warning />
            </el-icon>
            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="/hospital/inquire" @click="activeJump('/hospital/inquire')">
            <el-icon>
              <Search />
            </el-icon>
            <span>查询/取消</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <!-- 右侧医院详细信息展示区(组件展示区) -->
    <div class="details">
      <!-- 子组件展示区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入onMounted 
import { onMounted } from 'vue';
// 引入 pinia仓库
import useHospitalDetail from '../../store/modules/hospitalDetail'
// 创建 pinia仓库 对象
const detailStore = useHospitalDetail()
// 引入字体图标
import {
  Document,
  Search,
  Calendar,
  Warning
} from '@element-plus/icons-vue'
// 引入vue-router  和 route
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

function activeJump(path: string) {
  $router.push({ path,query:{hoscode:hosDetailData} })
}

let hosDetailData:any = $route.query.hoscode
// 挂载完毕就发请求拿医院详情的数据并存储到仓库
onMounted(() => {
  // 医院详情数据
  detailStore.getHospitalDetail(hosDetailData)
  // 医院科室的数据
  detailStore.getHospitalDepartment(hosDetailData)
})


</script>

<style scoped lang="scss">
.el-col-12 {
  max-width: 60%;
}

.hospital {
  display: flex;

  .navigation {
    flex: 2;
  }

  .details {
    flex: 8;
    padding-top: 20px
  }
}
</style>
