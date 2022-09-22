import type { Module } from 'vuex'
import type { IRootType } from '@/store/type'
import type { IDashboardType } from './type'
import {
  getAddressGoodsCount,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboard: Module<IDashboardType, IRootType> = {
  namespaced: true,
  state: () => {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsCount: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsCount(state, list) {
      state.addressGoodsCount = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCountRes = await getCategoryGoodsCount()
      const goodsSaleRes = await getCategoryGoodsSale()
      const goodsFavortRes = await getCategoryGoodsFavor()
      const addressGoodsCountRes = await getAddressGoodsCount()
      commit('changeCategoryGoodsCount', goodsCountRes.data)
      commit('changeCategoryGoodsSale', goodsSaleRes.data)
      commit('changeCategoryGoodsFavor', goodsFavortRes.data)
      commit('changeAddressGoodsCount', addressGoodsCountRes.data)
    }
  }
}

export default dashboard
