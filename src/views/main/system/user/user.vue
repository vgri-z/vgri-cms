<template>
  <div class="user">
    <vgri-form v-bind="searchFormConfig" />
  </div>
</template>

<script setup lang="ts">
import { VgriForm } from '@/base-ui/form/index'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped lang="less"></style>
