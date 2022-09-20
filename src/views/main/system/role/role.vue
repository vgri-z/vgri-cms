<template>
  <div class="role">
    <page-search
      :search-form-config="searchFormConfig"
      @search-btn-click="handleSearch"
      @reset-btn-click="handleReset"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="role"
      @handle-new-click="handleCreateData"
      @handle-edit-click="handleEditData"
    ></page-content>

    <page-modal
      ref="pageModalRef"
      :default-info="defaultInfo"
      :modal-config="modalConfig"
      :page-name="'role'"
      :title="'新建角色'"
      :other-info="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        show-checkbox
        node-key="id"
        @check="handleNodeCheck"
      />
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { PageSearch } from '@/components/page-search'
import { PageContent } from '@/components/page-content'
import { PageModal } from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { usePageModal, usePageSearch } from '@/hooks'
import { menuMapToLeaf } from '@/utils/mapMenus'
import { ElTree } from 'element-plus'

const store = useStore()
const menus = computed(() => store.state.entireMenu)
const otherInfo = ref()

const handleNodeCheck = (data1: any, data2: any) => {
  const checkKeys = data2.checkedKeys
  const halfCheckKeys = data2.halfCheckedKeys
  const menuList = [...checkKeys, ...halfCheckKeys]
  otherInfo.value = { menuList }
}

const [pageContentRef, handleReset, handleSearch] = usePageSearch()

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapToLeaf(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const [pageModalRef, defaultInfo, handleCreateData, handleEditData] = usePageModal(
  undefined,
  editCallback
)
</script>

<style scoped></style>
