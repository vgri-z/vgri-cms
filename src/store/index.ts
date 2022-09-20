// 在引入的时候可以通过as取别名
import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import type { IRootType, IStoreType } from './type'
import { getPageList } from '@/service/main/system/system'
import menu from '@/router/main/system/menu/menu'

// vuex createStore接收一个泛型S，这个S就是state的类型或者state返回值的类型
const store = createStore<IRootType>({
  state() {
    return {
      name: 'vgri',
      password: '1292839',
      height: '',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeName(state) {
      state.name = 'lsdgjd'
    },
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList) {
      state.entireMenu = menuList
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 初始化部门数据
      const departmentRes = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentRes.data
      commit('changeEntireDepartment', departmentList)
      // 初始化角色数据
      const roleRes = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleRes.data
      commit('changeEntireRole', roleList)
      // 初始化菜单数据
      const menuRes = await getPageList('/menu/list', {})
      const { list: menuList } = menuRes.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 解决在组件中使用useStore返回的是Store<any>类型，而不是具体类型的问题
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
