<template>
  <div class="main">
    <h1>main</h1>
    <!-- <router-link>daoh</router-link> -->
    <button @click="quitLogin">退出登录</button>
  </div>
</template>

<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
const router = useRouter()
function quitLogin() {
  //删除缓存的token，store里面的呢
  localCache.removeCache('token')
  //跳转回登录页
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
}
</style>
