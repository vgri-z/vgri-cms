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
        <vgri-card title="分类商品销量">
          <base-echart :option="option"></base-echart>
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
import { BaseEchart } from '@/base-ui/echart'
import { EChartsOption } from 'echarts'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
</script>

<style scoped lang="less">
.bottom-content {
  margin-top: 10px;
}
</style>
