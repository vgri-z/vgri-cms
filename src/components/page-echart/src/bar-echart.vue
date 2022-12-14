<template>
  <div class="bar-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed, ComputedRef } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { BaseEchart } from '@/base-ui/echart'

interface Props {
  dataAxis: string[]
  values: any[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  dataAxis: () => [],
  values: () => [],
  title: ''
})

const option: ComputedRef<EChartsOption> = computed(() => {
  return {
    title: {
      text: props.title
    },
    xAxis: {
      data: props.dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
