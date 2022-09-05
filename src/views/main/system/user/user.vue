<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :content-table-config="contentTableConfig" />
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { PageContent } from '@/components/page-content/index'
</script>

<style scoped lang="less"></style>
