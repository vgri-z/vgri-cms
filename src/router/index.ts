import { createRouter, createWebHashHistory } from 'vue-router'
// 前面添加一个type关键字，标识导入的是类型，而不是函数/方法，不写也可以，加type看上去更明确
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
