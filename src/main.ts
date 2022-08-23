import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// import './service/axios_demo'
import vgriRequest from './service/index'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')

vgriRequest.request({
  url: '/get',
  params: {
    name: 'vgri'
  },
  interceptors: {
    // 一般具体到某个网络请求，都只进行成功拦截，很少拦截失败
    requestInterceptor: (config) => {
      console.log('某个请求独有的请求拦截')
      return config
    },
    responseInterceptor: (res) => {
      // if (res.status === 200) {
      //   alert('请求成功')
      // }
      console.log('某个请求独有的响应拦截')
      return res
    }
  }
})
// vgriRequest.request({
//   url: '/get',
//   params: {
//     name: 'vgri'
//   }
// })
