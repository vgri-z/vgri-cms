// 在引入的时候可以通过as取别名
import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login/login'
import type { IRootType, IStoreType } from './type'

// vuex createStore接收一个泛型S，这个S就是state的类型或者state返回值的类型
const store = createStore<IRootType>({
  state() {
    return {
      name: 'vgri',
      password: '1292839',
      height: ''
    }
  },
  mutations: {
    changeName(state) {
      state.name = 'lsdgjd'
    }
  },
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
