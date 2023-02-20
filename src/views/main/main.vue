<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '100px' : '250px'">
        <mainMenu :isFold="!isFold"></mainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <mainHeader @fold-change="handleFoldChange"></mainHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
const isFold = ref(false)
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
      transition: width 2s ease;
    }
  }
}
</style>
