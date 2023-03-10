import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import MapPathToMenu from '@/utils/map-menus'
import { firstMenu } from '@/utils/map-menus'
//大家都喜欢使用函数,传入对象，返回router
//使用hash模式看起来舒服
//routes数组添加path和component之间的映射关系

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //路由重定向
    {
      path: '/',
      redirect: '/main'
    },

    {
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/notFound.vue')
    }
  ]
})
export function addRoutesWithMenu(menus) {
  //根据menus获取对应的路由
  const routes = MapPathToMenu(menus)
  //将
  for (const route of routes) {
    router.addRoute('main', route)
  }

}
//添加导航守卫
router.beforeEach((to, from) => {
  //return的是路由地址，但是我们可以判断to和from
  //不返回或者返回undefined，进行默认跳转
  const token = localCache.getCache("token")
  if (to.path === '/main' && !token) {
    return '/login'
  }
  // if (to.path === '/main') {
  //   //
  //   return firstMenu?.url
  // }
})
export default router
