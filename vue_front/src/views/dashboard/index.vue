<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">role: {{ roles }}</div> -->
    <h1 style="text-align: center; margin-top: 100px;">欢迎使用加工方案生成系统</h1>
    <h2 style="text-align: center;">作者：翟振</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
