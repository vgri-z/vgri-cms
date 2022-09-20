import { PageModal } from '@/components/page-modal'
import { Ref, ref } from 'vue'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleCreateData = () => {
    if (pageModalRef.value) {
      defaultInfo.value = {}
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }

  const handleEditData = (data: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...data }
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(data)
  }

  const modalTuple: [Ref<InstanceType<typeof PageModal>>, any, () => void, (data: any) => void] = [
    pageModalRef,
    defaultInfo,
    handleCreateData,
    handleEditData
  ]
  return modalTuple
}
