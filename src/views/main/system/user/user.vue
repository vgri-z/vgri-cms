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
    />
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { PageContent } from '@/components/page-content/index'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/index'

const [pageContentRef, handleReset, handleSearch] = usePageSearch()
</script>

<style scoped lang="less"></style>
