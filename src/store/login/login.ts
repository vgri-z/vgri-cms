import { Module } from 'vuex'
import type { IRootType } from '../type'
import type { ILoginType } from './type'

// Module接收两个泛型参数，第一个参数时state的类型，第二个是根模块的state的类型
const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      name: '',
      password: ''
    }
  },
  mutations: {},
  getters: {},
  actions: {
    loginAccountAction() {
      console.log('登录操作')
    }
  }
}

export default loginModule
