<template>
  <div class="vgri-table">
    <el-table :data="userList" border style="width: 100%">
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row" :text="'vgri'">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

interface Props {
  userList: any[]
  propList: any[]
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
  propList: () => []
})
</script>

<style scoped lang="less"></style>
