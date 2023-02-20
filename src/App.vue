<template>
  <div class="app">
    <div>
      <el-config-provider :locale="zhCn">
        <router-link to="/main">主页</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/main/system/user">用户管理</router-link>
        <router-view></router-view>
      </el-config-provider>
      <!-- <router-link to="/main">主页</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/main/system/role">用户管理</router-link>
      <router-view></router-view> -->

      <!-- <router-view></router-view> -->
      <!-- 可以直接拿到store里面的东西 -->
      <!-- <div>{{ counterStore.counter }}</div> -->
      <!-- 也可以通过get得到store里面的东西 -->
      <!-- <div>{{ counterStore.doubleCounter }}</div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
//使用store
// import useCounterStore from "@/store/counter"//不能发现这个文件
//useCounterStore是什么类型的数据呢，是个方法，defineStore得到的是一个方法
// import useCounterStore from '../src/store/counter'
// const counterStore = useCounterStore()
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style lang="less" scoped>
.app {
  /* background-color: red; */
  width: 100vw;
  height: 100vh;
  background-color: #92a065;
}
</style>
