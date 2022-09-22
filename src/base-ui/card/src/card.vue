<template>
  <div class="vgri-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>

<style scoped lang="less">
.card-header {
  text-align: left;
}
</style>
