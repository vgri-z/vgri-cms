import { ILoginType } from './login/type'
import { ISystemType } from './main/system/types'

export interface IRootType {
  name: string
  password: string
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  login: ILoginType
  system: ISystemType
}

// 使用一个交叉类型建useStore返回的Store<any>转成Store<IStoreType>，从而更有利于类型推断
export type IStoreType = IRootType & IRootWithModule
