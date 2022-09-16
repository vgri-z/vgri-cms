import vgriRequest from '@/service'
import { IDataType } from '@/service/types'

// 请求列表数据
export function getPageList(url: string, queryInfo: any) {
  return vgriRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// 删除列表数据
export function deletePageData(url: string) {
  return vgriRequest.delete<IDataType>({
    url
  })
}

// 新建列表数据
export function createPageData(url: string, newData: any) {
  return vgriRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 编辑列表数据
export function editPageData(url: string, editData: any) {
  return vgriRequest.patch<IDataType>({
    url,
    data: editData
  })
}
