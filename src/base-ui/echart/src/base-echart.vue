<template>
  <div class="base-echart">
    <div ref="echartsRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, withDefaults, defineProps } from 'vue'
import { EChartsOption } from 'echarts'
import { useEcharts } from '../hooks/useEcharts'
import { vgriEmitter } from '@/utils/event'
const echartsRef = ref<HTMLElement>()

interface Props {
  option: EChartsOption
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  option: () => ({}),
  width: '100%',
  height: '360px'
})

onMounted(() => {
  const { setOptions, updateSize } = useEcharts(echartsRef.value!)
  setOptions(props.option)

  // 侧边栏收缩/扩张时，重新计算尺寸
  vgriEmitter.on('echartResize', () => {
    updateSize()
  })
})
</script>

<style scoped lang="less"></style>
