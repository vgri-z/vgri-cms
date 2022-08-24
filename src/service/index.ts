import { VgriRequest } from './request/request'
// baseURL timeout等变量也应该在一个配置文件中单独配置
import { BASE_URL, TIME_OUT } from './request/config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: true,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      // console.log('请求拦截成功')
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
      // console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (res: AxiosResponse) => {
      // console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应拦截失败')
      return err
    }
  }
})
// console.log(vgriRequest)
export default vgriRequest

// 只有在new的时候才会调用class中的constructor函数，那为什么在调用class中的request方法时，
// 会调用constructor里面的拦截器方法？
// constructor构造器函数调用的时候，会将实例中传递的拦截器保存到instance中，然后注册到instance的interceptor中，
// 这是某个实例的独有的拦截器函数，然后再将全局的拦截器函数注册到instance的interceptor中，此时仅仅只是把所有的拦截器
// 函数添加到实例中，当调用request函数的发送请求的时候，首先会执行请求自带的拦截器函数，让后通过this.instance.request()
// 发起真正的网络请求，然后会把之前注册的拦截器函数都执行一遍，最后执行请求自带的响应拦截函数，所以说，每次发送请求的时候
// 都会将instance实例上添加的拦截器函数都执行一遍，这就是为什么每次请求都会答应那么多拦截器的原因，因为你注册了那么多
// 拦截器函数，在new的时候，不会执行添加的拦截器函数，只有发送请求的时候才会执行

// 项目可能会有多个baseurl，时可以创建不同的实例，分别进行网络请求
// const vgriRequest2 = new VgriRequest()
// const vgriRequest3 = new VgriRequest()
