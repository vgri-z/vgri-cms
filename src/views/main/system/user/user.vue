<template>
  <div class="user">
    <vgri-form v-bind="searchFormConfig" v-model="formData" />
  </div>
</template>

<script setup lang="ts">
import { VgriForm } from '@/base-ui/form/index'
import { ref } from 'vue'
import { searchFormConfig } from './config/search.config'

const formData = ref({
  id: '',
  name: '',
  password: '',
  hobbie: '',
  createTime: ''
})
</script>

<style scoped lang="less"></style>
