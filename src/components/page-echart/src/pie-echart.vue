<template>
  <div class="pie-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import { BaseEchart } from '@/base-ui/echart'
import { IDataType } from '../type'

interface Props {
  pieData: IDataType[]
}

const props = withDefaults(defineProps<Props>(), {
  pieData: () => []
})

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
