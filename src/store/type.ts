import { ILoginType } from './login/type'

export interface IRootType {
  name: string
  password: string
}

export interface IRootWithModule {
  login: ILoginType
}

export type IStoreType = IRootType & IRootWithModule
