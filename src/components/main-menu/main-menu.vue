<template>
  <div class="main-menu">
    <div class="logo">
      <img class="logo-img" src="@/assets/img/menu-logo.png" alt="logo图片" />
      <div class="logo-title" v-show="!isFold">后台管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        mode="vertical"
        collapse="isFold"
        default-active="2"
        text-color="#870f00"
        active-text-color="#d76701"
        class="el-menu-vertical-demo"
      >
        <el-sub-menu index="2" collapse="true">
          <!-- 设置插槽的样式 -->
          <template #title>
            <el-icon><location /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="1-1">核心技术</el-menu-item>
          <el-menu-item index="1-2">商品统计</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #5a2e00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    // 不使用flex布局进行img元素的水平居中
    text-align: center;
    padding: 10px;
    // width: 100%;
    .logo-img {
      width: 50px;
      height: 50px;
    }
    .logo-title {
      text-align: center;
      font-size: large;
      color: #ede6d3;
    }
  }
  .menu {
    color: #fff;
    .el-menu {
      background-color: #a65a40;
    }

    // 没有效果

    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px !important;
      }
      .el-menu-item:hover {
        background-color: #ede6d3;
      }
      .el-menu-item.is-active {
        background-color: blue;
      }
    }
  }
}
</style>
