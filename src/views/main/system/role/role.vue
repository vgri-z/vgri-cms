<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig" />
    <page-content :content-table-config="contentTableConfig" page-name="role"></page-content>
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search'
import { PageContent } from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
