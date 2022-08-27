<template>
  <div class="nav-header">
    <component :is="isFold ? 'Expand' : 'Fold'" @click="handleFold"></component>
    <div class="operate">
      <div class="breadcrumb">面包屑</div>
      <user-operate />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import UserOperate from './user-operate.vue'

const emits = defineEmits(['foldMenu'])
const isFold = ref(false)

const handleFold = () => {
  isFold.value = !isFold.value
  emits('foldMenu', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;

  .operate {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .breadcrumb {
      margin-left: 10px;
      align-self: center;
    }
  }
}
.el-icon {
  cursor: pointer;
}

svg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>
