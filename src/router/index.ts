import { createRouter, createWebHashHistory } from 'vue-router'
// 前面添加一个type关键字，标识导入的是类型，而不是函数/方法，不写也可以，加type看上去更明确
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
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
})

export default router
