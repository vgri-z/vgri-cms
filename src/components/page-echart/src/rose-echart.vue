<template>
  <div class="rose-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed, ComputedRef } from 'vue'
import { BaseEchart } from '@/base-ui/echart'
import { IDataType } from '../type'
import { EChartsOption } from 'echarts'

interface Props {
  pieData: IDataType[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  pieData: () => [],
  title: ''
})

const option: ComputedRef<EChartsOption> = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.pieData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
