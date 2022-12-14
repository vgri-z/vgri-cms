import { Module } from 'vuex'
import { IRootType } from '../../type'
import { ISystemType } from './types'
import {
  createPageData,
  deletePageData,
  editPageData,
  getPageList
} from '@/service/main/system/system'
import { useUpdatePageData } from '@/hooks/index'

// const pageUrls: { [name: string]: string } = {
//   users: '/users/list',
//   role: '/role/list'
// }

const systemModule: Module<ISystemType, IRootType> = {
  namespaced: true,
  state() {
    return {
      pageInfo: { currentPage: 1, pageSize: 10 },
      pageQuery: {},
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changePageInfo(state, pageInfo: any) {
      state.pageInfo = pageInfo
    },
    changePageQuery(state, pageQuery: any) {
      state.pageQuery = pageQuery
    },
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    // 通过getters动态返回列表数据
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取列表数据
    async getPageListAction({ commit }, payload) {
      // 根据传入的pageName动态匹配请求url
      const pageName: string = payload.pageName
      // 3. 接口规范时，可进行url的拼接
      const pageUrl = `/${pageName}/list`
      // 2. 可配置一个pageUrl对象，在里面配置好pageName与pageUrl的映射关系，再获取对应的请求路径
      // const pageUrl: string = pageUrls[pageName]
      // 1. 可通过switch动态匹配
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      const changeName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // console.log(changeName)

      const res = await getPageList(pageUrl, payload.queryInfo)
      const { list, totalCount } = res.data
      commit(`change${changeName}List`, list)
      commit(`change${changeName}Count`, totalCount)
      // switch (pageName) {
      //   case 'users':
      //     commit('changeUsersList', list)
      //     commit('changeUsersCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    },

    // 删除列表数据
    async deletePageDataAction(context, payload) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`

      const res = await deletePageData(url)
      useUpdatePageData(res, pageName, context)
    },
    // 新建列表数据
    async createPageDataAction(context, payload) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      const res = await createPageData(url, newData)
      useUpdatePageData(res, pageName, context)
    },
    // 编辑列表数据
    async editPageDataAction(context, payload) {
      const { pageName, id, editData } = payload
      const url = `/${pageName}/${id}`
      const res = await editPageData(url, editData)
      useUpdatePageData(res, pageName, context)
    }
  }
}

export default systemModule
