<template>
  <div class="user">
    <!-- //搜索区 -->
    <pageSearch></pageSearch>
    <!-- 展示区 -->
    <pageDisplay></pageDisplay>
    <!-- 新建和编辑 -->
    <pageOperate></pageOperate>
  </div>
</template>

<script lang="ts" setup>
import pageDisplay from './c-cpns/page-display.vue'
import pageSearch from './c-cpns/page.search.vue'
import pageOperate from './c-cpns/page-operate.vue'
</script>

<style lang="less" scoped>
.user {
}
</style>
