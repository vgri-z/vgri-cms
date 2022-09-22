import vgriRequest from '@/service'
import type { IDataType } from '@/service/types'

enum DashboardApi {
  categoryGoodsCountAPi = '/goods/category/count',
  categoryGoodsSaleApi = '/goods/category/sale',
  categoryGoodsFavorApi = '/goods/category/favor',
  addressGoodsSaleApi = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return vgriRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsCountAPi
  })
}

export function getCategoryGoodsSale() {
  return vgriRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsSaleApi
  })
}

export function getCategoryGoodsFavor() {
  return vgriRequest.get<IDataType>({
    url: DashboardApi.categoryGoodsFavorApi
  })
}

export function getAddressGoodsCount() {
  return vgriRequest.get<IDataType>({
    url: DashboardApi.addressGoodsSaleApi
  })
}
