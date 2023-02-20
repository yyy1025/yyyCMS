<template>
  <div class="main-menu">
    <div class="logo">
      <img class="logo-img" src="@/assets/img/menu-logo.png" alt="logo图片" />
      <div class="logo-title" v-show="!isFold">后台管理系统</div>
      <div>
        <h1>{{ activeDefault }}</h1>
      </div>
    </div>
    <div class="menu">
      <!-- mode="vertical"加上这个属性是侧边展开 -->
      <el-menu
        mode="vertical"
        :collapse="isFold"
        :default-active="activeDefault + ''"
        text-color="#870f00"
        active-text-color="#d76701"
        class="el-menu-vertical-demo"
      >
        <template v-for="item in permissions" :key="item.id">
          <div>
            <el-sub-menu :index="item.id + ''" title="标题">
              <!-- 设置插槽的样式 -->
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subitem in item.children" :key="subitem.id">
                <div>
                  <el-menu-item
                    :index="subitem.url + ''"
                    @click="handleSubitemClick(subitem)"
                  >
                    {{ subitem.name }}
                  </el-menu-item>
                </div>
              </template>
            </el-sub-menu>
          </div>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Location } from '@element-plus/icons-vue'
import { MapPathToMenu } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import loginStore from '@/store/login/login'
import { useRouter } from 'vue-router'
//设置`el-menu`的默认选中菜单高亮为刷新前的路由对应的菜单
const route = useRoute() //是string格式

const permissions = loginStore().permissions
console.log('menu-permissions', permissions)
const oldpath = MapPathToMenu(route.path, permissions)
console.log(oldpath)
const activeDefault = ref(oldpath?.id ?? '1' + '')
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
//监听点击，跳转路由
function handleSubitemClick(subitem: any) {
  router.push(subitem.url)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  width: 100%;
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
    width: 100%;
    .el-menu {
      background-color: #a65a40;
      width: 100%;
      // 没有效果

      .el-sub-menu {
        width: 100%;
        .el-menu-item {
          // padding-left: 50px !important;
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
}
</style>
