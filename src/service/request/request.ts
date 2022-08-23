import axios from 'axios'
import type { AxiosInstance } from 'axios'
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
        // 根据服务器返回的code显示请求失败信息
        // 请求的HttpErrorCode是200，但是服务器返回的code是不正确的，
        // 此时请求依然不成功，但是根据服务器返回的code显示请求失败信息
        const data = res.data // 网络请求的真是数据保存在res的data中
        if (data.code === 500) {
          console.log('请求失败')
        }
        return data
      },
      (err) => {
        // 根据不同的HttpErrorCode显示不同的请求错误的信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request(config: VgriRequestConfig) {
    // 某一个请求独有的请求拦截
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    return this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}
