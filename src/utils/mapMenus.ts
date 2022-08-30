import { IMenuType } from '@/service/login/type'
import { RouteRecordRaw } from 'vue-router'

export const mapUserMenus = (userMenus: IMenuType[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 递归遍历，将所有路由中与userMenus中的url匹配到的路由动态添加到children里面去

  const _recurseUserMenus = (menus: IMenuType[]) => {
    menus.forEach((menu) => {
      if (menu.type === 1) {
        _recurseUserMenus(menu.children)
      } else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      }
    })
  }
  _recurseUserMenus(userMenus)

  return routes
}

// 查找当前状态为active的菜单
export function pathMapToMenu(userMenus: IMenuType[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const targetMenu: IMenuType = pathMapToMenu(menu.children ?? [], currentPath)
      if (targetMenu) {
        return targetMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
