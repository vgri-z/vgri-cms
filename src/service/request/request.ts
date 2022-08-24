import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { VgriRequestInterceptors, VgriRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

// axios本身也是一个实例对象
export class VgriRequest {
  instance: AxiosInstance
  interceptors: VgriRequestInterceptors | undefined
  showLoading: boolean
  // 保存ElLoading.service返回的Loading实例，然后调用实例的close方法可以关闭loading
  loading?: LoadingInstance

  constructor(config: VgriRequestConfig) {
    // 创建实例对象instance，保证每次new操作时候的实例都是相互独立，互不干扰的
    this.instance = axios.create(config)
    // 将每个实例独有的拦截器保存下来
    this.interceptors = config.interceptors
    // 将每个实例的showLoading的值保存下来
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // 默认开启loading

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
        // console.log('所有请求都有的请求拦截器')
        // 为请求添加loading 全局的loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '数据请求中...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有请求都有的响应拦截器')

        // 关闭loading(请求结束后都要操作，不管请求成功或失败)
        this.loading?.close()

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
        this.loading?.close()

        // 根据不同的HttpErrorCode显示不同的请求错误的信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T>(config: VgriRequestConfig<T>): Promise<T> {
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      // 某一个请求独有的请求拦截
      // 发送请求时，这里的请求拦截最先执行
      if (config.interceptors?.requestInterceptor) {
        // 拦截后，对config进行某种转化后再返回config
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断某一个请求的loading是否显示
      if (config.showLoading === false) {
        this.showLoading = false
      }

      // 通过instance实例发送网络请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 这里的响应拦截最后执行
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          resolve(res)
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  put<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}
