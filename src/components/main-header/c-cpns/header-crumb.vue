<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import loginStore from '@/store/login/login'
import { MenusToBreadcrumb } from '@/utils/map-menus'
const route = useRoute()
const permissions = loginStore().permissions
const breadCrumbs = MenusToBreadcrumb(route.path, permissions)
</script>

<style lang="less" scoped>
.header-crumb {
}
</style>
