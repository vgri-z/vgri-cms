import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface VgriRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

// 类型扩展，方便在使用时可以传入一些拦截器
interface VgriRequestConfig extends AxiosRequestConfig {
  interceptors?: VgriRequestInterceptors
}

export { VgriRequestInterceptors, VgriRequestConfig }
