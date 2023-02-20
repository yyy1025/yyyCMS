<template>
  <div class="header-info">
    <div class="icons">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <el-icon><ChatLineRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="user-info">
      <!-- <el-avatar :size="50" :src="circleUrl" /> -->
      <a href="#">
        <img class="user-info-img" src="@/assets/img/user-info.png" alt="" />
      </a>
    </div>
    <div class="info">
      info
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  .icons {
    span {
      .el-icon {
        // display: inline-block;
        width: 50px;
        height: 50px;
      }
    }
    .dot {
    }
  }
  .user-info {
    .user-info-img {
      width: 50px;
      height: 50px;
    }
  }
  .info {
    color: red;
    background: red;
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
  }
}
</style>
