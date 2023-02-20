import { defineStore } from 'pinia'
import accountLoginRequest from '@/service/login'
import getUserPmsById from '@/service/login'
import getMenusByRoleid from '@/service/login'
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'
import router from "@/router"
import apis from "@/service/apis"
import MapMenusToRoutes from "@/utils/map-menus"

interface loginType {
  token: string
  UserPms: any,
  permissions: any
}
const loginStore = defineStore('login', {
  //state，get，actions
  state: (): loginType => ({
    token: '',
    UserPms: {},
    permissions: {}
  }),
  actions: {
    async accountLoginAction(account: any) {
      console.log('开始注册请求')
      // const loginRes = await accountLoginRequest(account)
      const data = JSON.stringify(account)
      const loginRes = await apis.post("/login", data)

      //发送请求之后返回的data里面就有{id,name,token}然后把返回的内容保存到store里面
      //上面是发送请求进行登录的操作，如果是第一次登录只有name，没有token和id
      //如果是第二次登录，可以从本地存储取出token，id是什么
      console.log('这是请求返回的结果', loginRes.data)
      this.token = loginRes.data.data.token
      //进行本地缓存,只需要保存token
      // localStorage.setItem('id', this.id)
      // localStorage.setItem('token', this.token)
      // localStorage.setItem('name', this.name)
      localCache.setCache('token', loginRes.data.data.token)
      //根据id先拿到权限信息
      console.log("用户id", loginRes.data.data.id)
      const getUserPmsRes = await apis.get(`/users/${loginRes.data.id}`)
      // const getUserPmsRes = await getUserPmsById(loginRes.data.id)
      console.log("用户角色", getUserPmsRes.data.data)
      this.UserPms = getUserPmsRes.data.data
      localCache.setCache("userInfo", this.UserPms)
      console.log("权限信息", getUserPmsRes.data.data.role)
      const roleid = getUserPmsRes.data.data.role.id
      console.log("角色id", roleid)
      // //根据角色请求用户的权限

      const permissionsRes = await apis.get(`/role/${roleid}/menu`)
      console.log("权限", permissionsRes.data.data)
      this.permissions = permissionsRes.data.data
      localCache.setCache("permissions", permissionsRes.data.data)
      // const permissions = await getMenusByRoleid(roleid)
      //动态加载路由
      const routes = MapMenusToRoutes(permissionsRes.data.data)
      routes.forEach(route => router.addRoute('main', route))

      //跳转到主页
      router.push("/main")

    },
    loadLocalCacheAction() {
      const token = localCache.getCache("token")
      const userInfo = localCache.getCache("userInfo")
      const userMenus = localCache.getCache("userMenus")
      if (token && userInfo && userMenus) {
        //登录成功
        //重新存储
        this.token = token
        this.UserPms = userInfo
        this.permissions = userMenus
        //刷新
        //动态加载路由
        const routes = MapMenusToRoutes(userMenus.data)
        routes.forEach(route => router.addRoute('main', route))

      }

    }
  }
})
export default loginStore
