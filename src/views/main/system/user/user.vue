<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :content-table-config="contentTableConfig" page-name="users" />
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { PageContent } from '@/components/page-content/index'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less"></style>
