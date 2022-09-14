<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @reset-btn-click="handleReset"
      @search-btn-click="handleSearch"
    />
    <page-content :content-table-config="contentTableConfig" page-name="users" ref="pageContentRef">
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig"></page-modal>
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { PageContent } from '@/components/page-content/index'
import { PageModal } from '@/components/page-modal/index'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks'
import { modalConfig } from './config/modal.config'

const [pageContentRef, handleReset, handleSearch] = usePageSearch()
</script>

<style scoped lang="less"></style>
