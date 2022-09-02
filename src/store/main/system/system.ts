import { Module } from 'vuex'
import { IRootType } from '../../type'
import { ISystemType } from './types'
import { getPageList } from '@/service/main/system/system'

const systemModule: Module<ISystemType, IRootType> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, payload) {
      state.userList = payload
    },
    changeUserCount(state, payload) {
      state.userCount = payload
    }
  },
  getters: {},
  actions: {
    async getPageListAction({ commit }, payload) {
      const res = await getPageList(payload.url, payload.queryInfo)
      const { list, totalCount } = res.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
