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

    <div class="info">
      <el-dropdown>
        <el-avatar :size="50" src="@/assets/img/user-info.png" />
        <span class="name">coderwhy</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided>
              <button @click="quitLogin">退出</button>
              <el-icon><Message /></el-icon>

              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Message /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Message /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { localCache } from '@/utils/cache'
import router from '@/router'
function quitLogin() {
  //删除缓存的token，store里面的呢
  localCache.removeCache('token')
  //跳转回登录页
  router.push('/login')
}
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

  .info {
    color: red;
    background: red;
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      // 宽度是可以被撑开的
      padding: 6px 22px;
    }
    :deep(.el-icon) {
      width: 50px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      // display: flex;
      opacity: 0.5;
      align-items: center;
      transition: opacity 2s ease;
    }
  }
}
</style>
