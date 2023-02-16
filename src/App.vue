<template>
  <div class="app">
    <h1>app</h1>
    <div>
      <router-link to="/main">主页</router-link>
      <router-link to="/login">登录</router-link>
      <router-view></router-view>
      <!-- 可以直接拿到store里面的东西 -->
      <div>{{ counterStore.counter }}</div>
      <!-- 也可以通过get得到store里面的东西 -->
      <div>{{ counterStore.doubleCounter }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//使用store
// import useCounterStore from "@/store/counter"//不能发现这个文件
//useCounterStore是什么类型的数据呢，是个方法，defineStore得到的是一个方法
import useCounterStore from '../src/store/counter'
const counterStore = useCounterStore()
</script>

<style lang= "less" scoped>
.app {
}
</style>
