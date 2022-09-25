<template>
  <div class="line-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed, ComputedRef } from 'vue'
import { BaseEchart } from '@/base-ui/echart'
import { EChartsOption } from 'echarts'

interface Props {
  xLabeles: string[]
  title?: string
  values: any[]
}

const props = withDefaults(defineProps<Props>(), {
  xLabeles: () => [],
  values: () => [],
  title: ''
})

const option: ComputedRef<EChartsOption> = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabeles
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
