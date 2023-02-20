<template>
  <div class="main">
    <!-- <router-link>daoh</router-link> -->
    <el-container>
      <el-aside :width="isFold ? '100px' : '250px'">
        <mainMenu :isFold="isFold"></mainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <mainHeader @fold-change="handleFoldChange"></mainHeader>
        </el-header>
        <el-main>main</el-main>
      </el-container>
    </el-container>
    <button @click="quitLogin">退出登录</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
const router = useRouter()
const isFold = ref(false)
function quitLogin() {
  //删除缓存的token，store里面的呢
  localCache.removeCache('token')
  //跳转回登录页
  router.push('/login')
}
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  // background: red;
  .el-container {
    .el-aside {
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      transition: width 2s linear;
    }
  }
}
</style>
