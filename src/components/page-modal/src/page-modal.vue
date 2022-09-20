<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center destroy-on-close>
      <vgri-form ref="vgriFormRef" v-bind="modalConfig" v-model="formData"></vgri-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineExpose, watch } from 'vue'
import { VgriForm } from '@/base-ui/form/index'
import { useStore } from '@/store'

const formData = ref<any>({})

interface Props {
  title?: string
  modalConfig: any
  defaultInfo?: any
  pageName: string
  otherInfo?: any
}

const props = withDefaults(defineProps<Props>(), {
  title: '新建用户',
  modalConfig: () => ({}),
  defaultInfo: () => ({}),
  pageName: ''
})

const dialogVisible = ref(false)

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const vgriFormRef = ref<InstanceType<typeof VgriForm>>()
const store = useStore()

const handleConfirmClick = async () => {
  // 表单校验
  const valid = await vgriFormRef.value?.vgriFormValidate()
  // console.log(valid, 'page-modal')

  if (valid) {
    // 验证通过
    if (Object.keys(props.defaultInfo).length) {
      // 编辑
      store.dispatch('system/editPageDataAction', {
        pageName: props.pageName,
        id: props.defaultInfo.id,
        editData: { ...formData.value, ...props.otherInfo }
      })
    } else {
      // 新建
      store.dispatch('system/createPageDataAction', {
        pageName: props.pageName,
        newData: { ...formData.value, ...props.otherInfo }
      })
    }

    dialogVisible.value = false
  }
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less"></style>
