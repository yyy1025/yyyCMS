import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
const localRoutes: RouteRecordRaw[] = []
function loadLocalRoutes() {
  const files: Record<string, any> = import.meta.glob("../../router/**/*.ts", {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    // console.log(module)
    localRoutes.push(module.default)
    // for (const item in localRoutes) {
    //   console.log(item)
    // }
  }
}
export default function MapMenusToRoutes(permissions) {
  for (const permission of permissions.data.data) {
    for (const submenu of permission.children) {
      const route = localRoutes.find(item => item.path == submenu.url)
      // console.log(route)
      if (route) {
        console.log("进来了", route)
        router.addRoute('main', route);
      }
    }
  }
}
