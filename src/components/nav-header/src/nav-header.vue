<template>
  <div class="nav-header">
    <component :is="isFold ? 'Expand' : 'Fold'" @click="handleFold"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['foldMenu'])
const isFold = ref(false)

const handleFold = () => {
  isFold.value = !isFold.value
  emits('foldMenu', isFold.value)
}
</script>

<style scoped lang="less">
.el-icon {
  cursor: pointer;
}

svg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>
