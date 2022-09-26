<template>
  <div class="map-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import { BaseEchart } from '@/base-ui/echart'
import { convertData } from '../utils/convertData'

interface Props {
  values: any[]
}

const props = withDefaults(defineProps<Props>(), {
  values: () => []
})

const option: any = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国泵机销售情况',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    // legend: {
    //   orient: 'vertical',
    //   right: 20,
    //   top: 10,
    //   data: ['泵机数'],
    //   textStyle: {
    //     color: '#fff'
    //   }
    // },
    visualMap: {
      min: 0,
      max: 60000,
      left: 10,
      bottom: 0,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#000'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      emphasis: {
        areaColor: 'rgb(235, 235, 235)',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: 'rgb(245, 255, 245)'
        }
      }
    },
    series: [
      {
        name: '全国销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.values),
        symbolSize: 12,
        emphasis: {
          show: false,
          label: {
            show: false
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
