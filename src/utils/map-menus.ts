import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function loadLocalRoutes(): RouteRecordRaw[] {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob("../router/**/*ts", {
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
//首次登录成功进入的时候，进入到firstMenu.url里面
export let firstMenu: any = null
//根据菜单匹配相对应的路由
export default function MapMenusToRoutes(permissions) {
  const localRoutes = loadLocalRoutes()
  console.log("localRoutes", localRoutes)
  const routes: RouteRecordRaw[] = []

  for (const permission of permissions) {
    //得到一级路由
    for (const submenu of permission.children) {
      //二级路由开始匹配submenu.url在el-menu中
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
  console.log("util里面routes", routes)
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
interface BreadCrumb {
  name: string,
  path: string
}
export function MenusToBreadcrumb(path: string, menus: any[]) {
  const breadCrumbs: BreadCrumb[] = []
  //
  console.log("传进来的被匹配的path", path)
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {

        breadCrumbs.push({ name: menu.name, path: menu.path })
        breadCrumbs.push({ name: submenu.name, path: submenu.path })
      }

    }
  }
  return breadCrumbs
}
