import { IMenuType } from '@/service/login/type'

export interface ILoginType {
  token: string
  userInfo: any
  userMenus: IMenuType[] | null
  permissions: string[]
}
