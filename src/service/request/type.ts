import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface VgriRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (err: any) => any
}

// 类型扩展，方便在使用时可以传入一些拦截器
interface VgriRequestConfig extends AxiosRequestConfig {
  interceptors?: VgriRequestInterceptors
  showLoading?: boolean
}

export { VgriRequestInterceptors, VgriRequestConfig }
