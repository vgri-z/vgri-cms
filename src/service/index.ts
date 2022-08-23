import { VgriRequest } from './request/request'
// baseURL timeout等变量也应该在一个配置文件中单独配置
import { BASE_URL, TIME_OUT } from './request/config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      console.log('请求拦截成功')
      // 在请求拦截中添加token
      // token一般添加到请求头里面，具体的添加位置根据实际情况决定，如果只是当前的实例需要，就在当前实例的请求拦截
      // 里面添加，如果所有的实例都需要token，那么就在全局的请求拦截里面添加
      const token = 'vgri-token'
      if (token && config.headers) {
        config.headers.Authorition = `Baerar ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (res: AxiosResponse) => {
      console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应拦截失败')
      return err
    }
  }
})

export default vgriRequest

// 项目可能会有多个baseurl，时可以创建不同的实例，分别进行网络请求
// const vgriRequest2 = new VgriRequest()
// const vgriRequest3 = new VgriRequest()
