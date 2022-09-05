<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />

    <div class="content">
      <vgri-table
        :user-list="userList"
        :prop-list="propList"
        :show-index-column="true"
        :show-select-column="true"
        :title="'用户列表'"
        @selectChange="handleSelectChange"
      >
        <!-- header插槽 -->
        <template #headerHandler>
          <el-button :icon="Plus" type="primary">新建用户</el-button>
          <el-button :icon="Refresh" type="primary">刷新</el-button>
        </template>
        <!-- 表格列插槽 -->
        <template #status="scope">
          <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
        <template #createAt="scope">
          {{ $filters.formatTime(scope.row.createAt) }}
        </template>
        <template #updateAt="scope"> {{ $filters.formatTime(scope.row.updateAt) }}</template>
        <template #handler>
          <el-button size="small" text type="primary" :icon="Edit">编辑</el-button>
          <el-button size="small" text type="danger" :icon="Delete">删除</el-button>
        </template>
        <!-- footer插槽 -->
        <template #footer> </template>
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
import { Delete, Edit, Plus, Refresh } from '@element-plus/icons-vue'

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
  { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' },
  { label: '操作', 'min-width': '140', slotName: 'handler' }
]

const handleSelectChange = (event: any[]) => {
  console.log(event)
}
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
