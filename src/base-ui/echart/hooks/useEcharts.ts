import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export function useEcharts(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (option: EChartsOption) => {
    echartInstance.setOption(option)
  }

  // 返回响应式变化函数
  const updateSize = () => {
    echartInstance.resize()
    console.log('00000')
  }

  // 响应式
  window.addEventListener(
    'resize',
    function () {
      echartInstance.resize()
    },
    false
  )

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
