<template>
  <div class="login-panel">
    <h1 class="title">YY后台管理系统</h1>
    <div class="tabs">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
        stretch
      >
        <!-- 使用插槽实现显示的切换 -->
        <!-- 根据name区分el-tabs绑定的是什么 -->
        <el-tab-pane label="账号登录" name="account">
          <!-- 使用插槽label -->
          <template #label>
            <div class="label">
              <el-icon class="icon">
                <Avatar />
              </el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <!-- account表单展示内容 -->
          <!-- <h2>account展示内容</h2> -->
          <paneAccount ref="accountRef"></paneAccount>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon class="icon">
                <PhoneFilled />
              </el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <panePhone></panePhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="passwords">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login">
      <el-button
        class="login-btn"
        type="success"
        round
        size="large"
        @click="loginAciton"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
//导入ref,使用ref包裹默认值
import { ref, watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
//已经挂载到了vue上面，难道不能直接使用吗
import type { TabsPaneContext } from 'element-plus'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'
// const isRemPwd = ref(true)
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
//isRemPwd也保持和上一次点击相同的状态
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('phone')
const accountNumber = ref('')
const password = ref('')
const accountRef = ref<InstanceType<typeof paneAccount>>() //为什么是个函数呢
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
function loginAciton() {
  console.log('立即登录', accountRef.value?.loginAction)
  // accountRef.value?.loginAction(accountRef)
  console.log('去store里面执行请求')
  accountRef.value?.loginAction(isRemPwd.value)
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  height: 330px;

  .title {
    /* 居中：文字 */
    text-align: center;
  }

  .tabs {
    height: 200px;

    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }

    .label {
      // height: 100px;
      // width: 100px;
      .icon {
        margin-right: 10px;
      }
    }

    .account {
      margin: 10px;
    }
  }

  .passwords {
    /* height: 100px;
    width: 100px; */
    /* 记住密码和忘记密码分布在左右两边 */
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    /* 要做到让这个按钮宽度和外边框宽度一样宽 */
    /* 如果封装的组件暴露了这个属性，就可以直接设置 */
    width: 100%;
  }
}
</style>
