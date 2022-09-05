<template>
  <div class="page-content">
    <vgri-table
      :user-list="userList"
      v-bind="contentTableConfig"
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
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { VgriTable } from '@/base-ui/table'
import { Delete, Edit, Plus, Refresh } from '@element-plus/icons-vue'
import { contentTableConfig } from '@/views/main/system/user/config/content.config'
import { useStore } from '@/store'

defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  }
})

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

const handleSelectChange = (event: any[]) => {
  console.log(event)
}
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
