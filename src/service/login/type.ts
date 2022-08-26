export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IMenuType {
  children: IMenuType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
  iconName?: string
}

// 服务器返回的data类型不确定，每个请求返回的data类型各不相同，所以无法明确表示，
// 通过定义每个请求返回的data分别定义类型，通过泛型参数进行传递
export interface IDataType<T = any> {
  code: number
  data: T
}
