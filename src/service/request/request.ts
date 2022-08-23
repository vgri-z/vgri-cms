import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { VgriRequestInterceptors, VgriRequestConfig } from './type'

// axios本身也是一个实例对象
export class VgriRequest {
  instance: AxiosInstance
  interceptors: VgriRequestInterceptors | undefined

  constructor(config: VgriRequestConfig) {
    // 创建实例对象instance，保证每次new操作时候的实例都是相互独立，互不干扰的
    this.instance = axios.create(config)
    // 将每个实例独有的拦截器保存下来
    this.interceptors = config.interceptors

    // 添加每个实例独有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有请求都有的请求拦截器')
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有请求都有的响应拦截器')
        return res
      },
      (err) => {
        return err
      }
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
