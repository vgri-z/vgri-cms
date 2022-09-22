<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <vgri-card :title="'分类商品数量(饼图)'" />
      </el-col>
      <el-col :span="10">
        <vgri-card title="不同城市商品销量" />
      </el-col>
      <el-col :span="7">
        <vgri-card title="分类商品数量(玫瑰图)" />
      </el-col>
    </el-row>
    <el-row :gutter="10" class="bottom-content">
      <el-col :span="12">
        <vgri-card title="分类商品销量" />
      </el-col>
      <el-col :span="12">
        <vgri-card title="分类商品收藏" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { VgriCard } from '@/base-ui/card'
import { useStore } from '@/store'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')
</script>

<style scoped lang="less">
.bottom-content {
  margin-top: 10px;
}
</style>
