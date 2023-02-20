import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function loadLocalRoutes(): RouteRecordRaw[] {
  const localRoutes: RouteRecordRaw[] = []
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

  return localRoutes
}
export let firstMenu: any = null
//首次登录成功进入的时候，进入到firstMenu.url里面
export default function MapMenusToRoutes(permissions) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const permission of permissions.data.data) {
    for (const submenu of permission.children) {
      const route = localRoutes.find(item => item.path == submenu.url)
      // console.log(route)
      if (route) {
        console.log("进来了", route)
        routes.push(route)
        if (!firstMenu)//为空{
          firstMenu = submenu
      }
    }
  }

  return routes
}
export function MapPathToMenu(path: string, menus: any[]) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.path)
        return submenu
    }
  }
  return undefined

}
