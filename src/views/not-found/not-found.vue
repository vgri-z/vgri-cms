<template>
  <div class="not-found">
    <el-empty>
      <template #description>
        <div>
          当前页面不存在，请
          <span style="color: #409eff; cursor: pointer" @click="back">返回上一级</span>
        </div>
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const back = () => {
  router.back()
}
</script>

<style scoped lang="less"></style>
