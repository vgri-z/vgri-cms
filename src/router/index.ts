import { createRouter, createWebHashHistory } from 'vue-router'
// 前面添加一个type关键字，标识导入的是类型，而不是函数/方法，不写也可以，加type看上去更明确
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/mian/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router