import { VgriRequest } from './request/request'
// baseURL timeout等变量也应该在一个配置文件中单独配置
import { BASE_URL, TIME_OUT } from './request/config'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default vgriRequest

// 项目可能会有多个baseurl，时可以创建不同的实例，分别进行网络请求
// const vgriRequest2 = new VgriRequest()
// const vgriRequest3 = new VgriRequest()
