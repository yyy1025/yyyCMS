import { createRouter, createWebHashHistory } from 'vue-router'
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
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/notFound.vue')
    }
  ]
})
export default router
