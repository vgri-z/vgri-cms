import vgriRequest from '../index'
import type { IAccount, IDataType, ILoginResult } from './type'

enum LoginApi {
  LoginAcount = '/login',
  UserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return vgriRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.LoginAcount,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return vgriRequest.get<IDataType>({
    url: LoginApi.UserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return vgriRequest.get<IDataType>({
    url: LoginApi.UserMenu + id + '/menu'
  })
}
