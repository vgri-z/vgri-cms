<template>
  <div class="page-search">
    <vgri-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </div>
      </template>
    </vgri-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { VgriForm } from '@/base-ui/form/index'
import { Search, Refresh } from '@element-plus/icons-vue'

defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const formData = ref({
  id: '',
  name: '',
  password: '',
  hobbie: '',
  createTime: ''
})
</script>

<style scoped lang="less"></style>
