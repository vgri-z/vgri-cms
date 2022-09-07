// import { ref } from 'vue'
// import { PageContent } from '@/components/page-content/index'

// export function usePageSearch() {
//   const pageContentRef = ref<InstanceType<typeof PageContent>>()

//   const handleReset = () => {
//     pageContentRef.value?.getListData()
//   }

//   const handleSearch = (queryInfo: any) => {
//     pageContentRef.value?.getListData(queryInfo)
//   }

//   return [pageContentRef, handleReset, handleSearch]
// }

import { Ref, ref } from 'vue'
import PageContent from '../components/page-content/src/page-content.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleReset = () => {
    pageContentRef.value?.getListData()
  }

  const handleSearch = (queryInfo: any) => {
    pageContentRef.value?.getListData(queryInfo)
  }

  const handleSearchTuple: [
    Ref<InstanceType<typeof PageContent>>,
    () => void,
    (queryInfo: any) => void
  ] = [pageContentRef, handleReset, handleSearch]

  return handleSearchTuple
}
