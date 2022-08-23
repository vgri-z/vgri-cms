import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface VgriRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 类型扩展，方便在使用时可以传入一些拦截器
interface VgriRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: VgriRequestInterceptors<T>
  showLoading?: boolean
}

export { VgriRequestInterceptors, VgriRequestConfig }
