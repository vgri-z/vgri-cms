import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import type { IRootType } from '../type'
import type { ILoginType } from './type'
import { IAccount, IMenuType } from '@/service/login/type'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenuToPermission, mapUserMenus } from '@/utils/mapMenus'

// Module接收两个泛型参数，第一个参数时state的类型，第二个是根模块的state的类型
const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: null,
      permissions: []
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: IMenuType[]) {
      state.userMenus = payload

      // 动态添加路由
      const routes = mapUserMenus(state.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenuToPermission(state.userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async loginAccountAction({ commit }, payload: IAccount) {
      // 1. 登录
      const loginRes = await accountLoginRequest(payload)
      const { id, token } = loginRes.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 获取用户信息
      const userInfoRes = await requestUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 获取角色菜单
      const userMenuRes = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuRes.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
