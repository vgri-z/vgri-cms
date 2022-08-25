import { ILoginType } from './login/type'

export interface IRootType {
  name: string
  password: string
}

export interface IRootWithModule {
  login: ILoginType
}

// 使用一个交叉类型建useStore返回的Store<any>转成Store<IStoreType>，从而更有利于类型推断
export type IStoreType = IRootType & IRootWithModule
