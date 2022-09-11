<template>
  <div class="goods">
    <page-content :content-table-config="contentTableConfig" page-name="goods">
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '已上架' : '未上架' }}
        </el-button>
      </template>
      <template #goodsImage="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          preview-teleported
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #newPrice="scope">
        {{ '¥ ' + scope.row.newPrice }}
      </template>
      <template #oldPrice="scope">
        {{ '¥ ' + scope.row.oldPrice }}
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import { PageContent } from '@/components/page-content/index'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
