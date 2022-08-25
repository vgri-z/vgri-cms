import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import type { IRootType } from '../type'
import type { ILoginType } from './type'
import { IAccount } from '@/service/login/type'
import { localCache } from '@/utils/cache'
import router from '@/router'

// Module接收两个泛型参数，第一个参数时state的类型，第二个是根模块的state的类型
const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: {}
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: any) {
      state.userMenu = payload
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
      const userMenus = userInfoRes.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenuRes)

      // 跳转到首页
      router.push('/main')
    }
  }
}

export default loginModule
