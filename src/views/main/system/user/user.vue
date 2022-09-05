<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />

    <div class="content">
      <vgri-table :user-list="userList" :prop-list="propList">
        <template #status="scope">
          <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
        <template #createAt="scope">
          {{ $filters.formatTime(scope.row.createAt) }}
        </template>
        <template #updateAt="scope"> {{ $filters.formatTime(scope.row.updateAt) }}</template>
      </vgri-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PageSearch } from '@/components/page-search/index'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'
import { VgriTable } from '@/base-ui/table'

const store = useStore()
store.dispatch('system/getPageListAction', {
  url: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const userList = computed(() => store.state.system.userList)
// const userCount = computed(() => store.state.system?.userCount)

const propList = [
  { prop: 'name', label: '用户名', 'min-width': '100' },
  { prop: 'realname', label: '真实姓名', 'min-width': '100' },
  { prop: 'cellphone', label: '手机号码', 'min-width': '100' },
  { prop: 'enable', label: '状态', 'min-width': '100', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', 'min-width': '200', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' }
]
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
