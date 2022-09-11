import { IBreadItem } from '@/base-ui/breadcrumb/types/type'
import { IMenuType } from '@/service/login/type'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: IMenuType

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
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    })
  }
  _recurseUserMenus(userMenus)

  return routes
}

// 获取面包屑数据
export function pathToBreadcrumb(userMenus: IMenuType[], currentPath: string): any {
  const breadcrumbs: IBreadItem[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 查找当前状态为active的菜单
export function pathMapToMenu(
  userMenus: IMenuType[],
  currentPath: string,
  breadcrumbs?: IBreadItem[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const targetMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (targetMenu) {
        breadcrumbs?.push(...[menu, targetMenu])
        return targetMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === currentPath) {
        return menu
      }
    }
  }
}

// 获取用户权限列表
export function mapMenuToPermission(userMenus: any[]) {
  const userPermissions: string[] = []

  const _recurseUserMenus = (menus: IMenuType[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseUserMenus(menu.children ?? [])
      } else if (menu.type === 3) {
        userPermissions.push(menu.permission!)
      }
    }
  }

  _recurseUserMenus(userMenus)

  return userPermissions
}

export { firstMenu }
