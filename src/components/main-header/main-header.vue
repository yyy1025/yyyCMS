<template>
  <div class="main-header">
    <div class="main-icon">
      <el-icon @click="handleIconClick">
        <!-- <Fold /><Expand /> -->
        <component :is="isExpand ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb></headerCrumb>
      <div class="user-info">
        <headerInfo></headerInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'
//定义自定义事件
const emit = defineEmits(['foldChange'])
const isExpand = ref(true)
function handleIconClick() {
  isExpand.value = !isExpand.value
  //将子组件的值传给父组件(定义事件)，再传给兄弟组件
  //将事件和状态传递给父组件,传递的是isFold的值
  emit('foldChange', !isExpand.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  width: 1000px;
  .main-icon {
    .el-icon {
      width: 50px;
      height: 50px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;

    .user-info {
    }
  }
}
</style>
