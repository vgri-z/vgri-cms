<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center>
      <vgri-form v-bind="modalConfig" v-model="formData"></vgri-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">确认</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from 'vue'
import { VgriForm } from '@/base-ui/form/index'

const formData = ref({})

interface Props {
  title?: string
  modalConfig: any
}

withDefaults(defineProps<Props>(), {
  title: '新建用户',
  modalConfig: () => ({})
})

const dialogVisible = ref(true)
</script>

<style scoped lang="less"></style>
