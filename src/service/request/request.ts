import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// axios本身也是一个实例对象
export class VgriRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    // 创建实例对象instance，保证每次new操作时候的实例都是相互独立，互不干扰的
    this.instance = axios.create(config)
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
