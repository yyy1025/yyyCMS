<template>
  <div class="login">
    <!-- TODO ：登录页背景全屏，颜色；登录页tab标签 -->
    <!-- <h1>后台管理系统</h1> -->
    <loginPanel></loginPanel>
  </div>
</template>

<script lang="ts" setup>
import loginPanel from './c-cpns/login-pane.vue'
</script>

<style lang="less" scoped>
.login {
  /* 这样写height不生效 */
  /* width: 100%;
  height: 100%; */
  width: 100vw;
  height: 100vh;
  background-color: url('../../assets/img/loginBg.svg');
  /* tab页居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
