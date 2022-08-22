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
