import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import './assets/css/index.less'

import { globalRegister } from './global'

// import './service/axios_demo'
// import vgriRequest from './service/index'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')

// 注册element-icon全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// vgriRequest.request({
//   url: '/get',
//   params: {
//     name: 'vgri'
//   },
//   interceptors: {
//     // 一般具体到某个网络请求，都只进行成功拦截，很少拦截失败
//     requestInterceptor: (config) => {
//       console.log('某个请求独有的请求拦截')
//       return config
//     },
//     responseInterceptor: (res) => {
//       // if (res.status === 200) {
//       //   alert('请求成功')
//       // }
//       console.log('某个请求独有的响应拦截')
//       return res
//     }
//   }
// })

// interface DataType {
//   args: any
//   url: string
//   origin: string
//   headers: any
// }

// vgriRequest
//   .request<DataType>({
//     url: '/get',
//     params: {
//       name: 'vgri'
//     },
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.args)
//     console.log(res.headers)
//     console.log(res.origin)
//     console.log(res.url)
//   })

// vgriRequest
//   .get<DataType>({
//     url: '/get',
//     params: {
//       name: 'vgri'
//     },
//     showLoading: true,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的请求拦截')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独请求的响应拦截')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// vgriRequest
//   .post<DataType>({
//     url: '/post',
//     data: {
//       name: 'vgri',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
