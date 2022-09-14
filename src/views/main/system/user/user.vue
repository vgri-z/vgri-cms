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
      :modal-config="modalConfig"
      ref="pageModalRef"
      :default-info="defaultInfo"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { PageContent } from '@/components/page-content/index'
import { PageModal } from '@/components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch, usePageModal } from '@/hooks'

const [pageContentRef, handleReset, handleSearch] = usePageSearch()
const [pageModalRef, defaultInfo, handleCreateData, handleEditData] = usePageModal()
</script>

<style scoped lang="less"></style>
