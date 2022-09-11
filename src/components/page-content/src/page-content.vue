<template>
  <div class="page-content">
    <vgri-table
      :list-data="listData"
      v-bind="contentTableConfig"
      @selectChange="handleSelectChange"
      :list-count="listCount"
      v-model:page="pageInfo"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button :icon="Plus" type="primary">新建用户</el-button>
        <el-button :icon="Refresh" type="primary">刷新</el-button>
      </template>
      <!-- 表格列插槽 -->
      <!-- 公共部分 -->
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope"> {{ $filters.formatTime(scope.row.updateAt) }}</template>
      <template #handler>
        <el-button size="small" text type="primary" :icon="Edit">编辑</el-button>
        <el-button size="small" text type="danger" :icon="Delete">删除</el-button>
      </template>
      <!-- 动态插入各模块各自的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item?.slotName">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row.prop }}
          </slot>
        </template>
      </template>
      <!-- footer插槽 -->
      <template #footer> </template>
    </vgri-table>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineExpose, ref, watch } from 'vue'
import { VgriTable } from '@/base-ui/table'
import { Delete, Edit, Plus, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const store = useStore()

// 1. 双向绑定pageInfo数据
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => {
  getListData()
})
// 2. 发送请求获取列表数据
const getListData = (queryInfo: any = {}) => {
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}

getListData()

// 3. 从vuex中取出数据
const listData = computed(() => store.getters['system/pageListData'](props.pageName))
const listCount = computed(() => store.getters['system/pageListCount'](props.pageName))

// 4. 获取剩余的动态插槽
const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})
console.log(otherPropSlots)

const handleSelectChange = (event: any[]) => {
  console.log(event)
}

defineExpose({
  getListData
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
