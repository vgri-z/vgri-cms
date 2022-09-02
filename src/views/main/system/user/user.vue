<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
  </div>
</template>

<script setup lang="ts">
import { PageSearch } from '@/components/page-search/index'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'

const store = useStore()
store.dispatch('systemModule/getPageListAction', {
  url: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
  padding: 10px 0;
}

.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
