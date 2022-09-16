import type { IDataType } from '@/service/types'
import type { ISystemType } from '@/store/main/system/types'
import type { IRootType } from '@/store/type'
import type { ActionContext } from 'vuex'
import { ElMessage } from 'element-plus'

export function useUpdatePageData(
  res: IDataType,
  pageName: string,
  context: ActionContext<ISystemType, IRootType>
) {
  if (res.code === 0) {
    ElMessage({
      message: res.data,
      type: 'success'
    })
    // 获取所有的请求参数
    const queryInfo = {
      offset: (context.state.pageInfo.currentPage - 1) * context.state.pageInfo.pageSize,
      size: context.state.pageInfo.pageSize,
      ...context.state.pageQuery
    }
    // console.log(queryInfo)
    // 重新请求列表数据
    context.dispatch('getPageListAction', {
      pageName,
      queryInfo
    })
  }
}
