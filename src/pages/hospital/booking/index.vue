<template>
  <div class="booking">
    <h1 class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知</h1>
    <p class="notice fs-color">为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
    <div class="realName down fs-color lineHeight">
      <h2 class="small-title">一、预约实名制</h2>
      <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
    </div>
    <div class="registered down fs-color">
      <h2 class="small-title">二、预约挂号：</h2>
      <p>按照北京市卫健委统一平台要求，预约挂号规则如下：
        在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；
        在同一自然周，同一就诊人，可以预约最多8个号源；
        在同一自然月，同一就诊人，可以预约最多12个号源；
        在同一自然季度，同一就诊人，可以预约最多24个号源。</p>
    </div>
    <div class="cancel down fs-color">
      <h2 class="small-title">三、取消预约：</h2>
      <p>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
    </div>
    <div class="dispose down fs-color">
      <h2 class="small-title">四、爽约处理：</h2>
      <p>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：
        累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；
        累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
// 引入仓库
import useHospitalDetail from '../../../store/modules/hospitalDetail';
let hospitalStore = useHospitalDetail()

</script>
  
<style scoped lang="scss">
// 公用样式
.down {
  margin-bottom: 30px;
  line-height: 25px;
}

.fs-color {
  color: #7f7f7f;
}

.small-title{
  font-weight: 700;
  margin-bottom: 15px;
  color: #494949;
}

.booking {
  padding-top: 30px;

  .title {
    text-align: center;
    font-size: 25px;
    margin-bottom: 24px;
  }

  .notice {
    margin-bottom: 25px;
    color: #494949;
  }
}
</style>
  