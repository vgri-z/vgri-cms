import { PageModal } from '@/components/page-modal'
import { Ref, ref } from 'vue'

export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleCreateData = () => {
    console.log(pageModalRef.value!.dialogVisible)
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }
  const handleEditData = (data: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...data }
      pageModalRef.value.dialogVisible = true
    }
  }

  const modalTuple: [Ref<InstanceType<typeof PageModal>>, any, () => void, (data: any) => void] = [
    pageModalRef,
    defaultInfo,
    handleCreateData,
    handleEditData
  ]
  return modalTuple
}
