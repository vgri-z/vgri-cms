import vgriRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageList(url: string, queryInfo: any) {
  return vgriRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
