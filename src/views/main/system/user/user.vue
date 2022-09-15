<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @reset-btn-click="handleReset"
      @search-btn-click="handleSearch"
    />
    <page-content
      :content-table-config="contentTableConfig"
      page-name="users"
      ref="pageContentRef"
      @handle-new-click="handleCreateData"
      @handle-edit-click="handleEditData"
    >
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
    <page-modal
      :modal-config="modalConfigRef"
      :default-info="defaultInfo"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PageSearch } from '@/components/page-search/index'
import { PageContent } from '@/components/page-content/index'
import { PageModal } from '@/components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch, usePageModal } from '@/hooks'
import { useStore } from '@/store'

const [pageContentRef, handleReset, handleSearch] = usePageSearch()

// 显示密码输入框
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
  passwordItem!.isHidden = false
}
// 隐藏密码输入框
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
  passwordItem!.isHidden = true
}

// 动态添加部门与角色数据
const store = useStore()
// 当modalConfigRef发生变化的时候，page-modal会重新加载
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
  departmentItem!.options = store.state.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item) => {
    return { label: item.name, value: item.id }
  })
  return modalConfig
})

const [pageModalRef, defaultInfo, handleCreateData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped lang="less"></style>
