<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <vgri-card :title="'分类商品数量(饼图)'">
          <pie-echart :pie-data="categoryGoodsCount"></pie-echart>
        </vgri-card>
      </el-col>
      <el-col :span="10">
        <vgri-card title="不同城市商品销量" />
      </el-col>
      <el-col :span="7">
        <vgri-card title="分类商品数量(玫瑰图)">
          <rose-echart :pie-data="categoryGoodsCount"></rose-echart>
        </vgri-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="bottom-content">
      <el-col :span="12">
        <vgri-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </vgri-card>
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
import { PieEchart, RoseEchart, LineEchart } from '@/components/page-echart'
import { computed, pushScopeId } from 'vue'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const categoryGoodsSale = computed(() => {
  const xLabeles: string[] = []
  const values: any[] = []

  store.state.dashboard.categoryGoodsSale.forEach((item) => {
    xLabeles.push(item.name)
    values.push(item.goodsCount)
  })
  return {
    xLabeles,
    values
  }
})
</script>

<style scoped lang="less">
.bottom-content {
  margin-top: 10px;
}
</style>
