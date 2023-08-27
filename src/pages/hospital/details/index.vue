<template>
  <div class="detail">
    <!-- 上半部分 -->
    <div class="top">
      <!-- 医院名称和等级 -->
      <div class="title">
        <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
        <div class="level">
          <svg t="1692278671317" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4041" width="16" height="16">
            <path
              d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
              p-id="4042"></path>
          </svg>
          <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
        </div>
      </div>
      <!-- 医院logo和指南 -->
      <div class="guide">
        <div class="logo">
          <img :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`">
        </div>
        <div class="right">
          <p>具体地址:{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</p>
          <p>规划路线:{{ hospitalStore.hospitalInfo.hospital?.route }}</p>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="bottom">
      <!-- 医院介绍标题区域 -->
      <div class="introduce">
        医院介绍
      </div>
      <!-- 详细介绍区域 -->
      <div class="text">{{ hospitalStore.hospitalInfo.hospital?.intro }}</div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
// 引入仓库 
import useHospitalDetail from '../../../store/modules/hospitalDetail';
let hospitalStore: any = useHospitalDetail()

</script>
  
<style scoped lang="scss">
.detail {
  .top {
    .title {
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

    .guide {
      display: flex;
      margin-top: 30px;

      .logo {
        flex: 2;
        img{
          width: 150px;
          height: 150px;
        }
      }

      .right {
        flex: 8;
        line-height: 24px;
        color: #7f7f7f;
        font-size: 15px;
        padding-top: 35px;
      }
    }
  }
  .bottom {
    margin-top: 30px;
    .introduce {
      margin-bottom: 15px;
      font-size: 18px;
    }
    .text{
      color: #7f7f7f;
      font-size: 15px;
      line-height: 24px;
    }
  }
}</style>
  