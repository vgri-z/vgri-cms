import axios from 'axios'

// 0: Promise中类型的使用
// 没有指定类型之前，res的类型是unknown，添加泛型string后，指定类型
// Promise就是个class
// new Promise<string>((resolve) => {
//   resolve('vgri')
// }).then((res) => {
//   console.log(res)
// })

// 1.模拟get请求
// axios在内部已经进行了resolve操作，所以可以直接then()
// axios的请求返回的类型都是一个AxiosResponse<any>类型值
// axios.get()返回一个Promise<AxiosResponse<any>>类型的值，axios在内部调用resolve的时候，会传递一个AxiosResponse<any>类型的值给res
// axios.get('http://httpbin.org/get').then((res) => {
//   console.log(res)
// })

// // get传参
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'vgri',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 2. post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'vae',
//       age: 22
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 3. axios配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

// axios
//   .get('/get', {
//     params: {
//       name: 'vgri',
//       age: 18
//     }
//     // 每一个请求单独配置
//     // baseURL: 'http://httpvgri.org',
//     // headers: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     data: {
//       name: 'vae',
//       age: 22
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4. axios.all() -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'vgri' } }),
    axios.post('/post', { data: { name: 'vae' } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 5. axios拦截器
// 请求拦截与响应拦截都会接收两个函数作为参数，分别是请求成功/响应成功拦截、请求失败/响应失败拦截
axios.interceptors.request.use(
  (config) => {
    // 可以在里面进行一些操作
    // 1. 加loading
    // 2. 为请求添加token
    return config
  },
  (err) => {
    console.log(err)
  }
)
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    console.log(err)
  }
)
