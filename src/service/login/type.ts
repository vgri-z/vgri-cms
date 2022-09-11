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
  permission?: string
}
