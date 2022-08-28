<template>
  <div class="vgri-form">
    <el-form label-width="120px">
      <el-row>
        <template v-for="item in formItems" :key="item.lable">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :label-width="labelWidth" :style="formItemStyle">
              <!-- input/password -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password' ? true : false"
                  v-bind="item.otherOptions"
                />
              </template>
              <!-- select -->
              <template v-else-if="item.type === 'select'">
                <el-select v-bind="item.otherOptions" style="width: 100%">
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <!-- date-picker -->
              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker v-bind="item.otherOptions"></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import { IFormItem } from '../types/type'

interface Props {
  formItems: IFormItem[]
  labelWidth: string
  formItemStyle: any
  colLayout: any
}

const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
  labelWidth: '120px',
  formItemStyle: { padding: '10px 40px' },
  colLayout: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 6
  }
})
</script>

<style scoped lang="less">
.vgri-form {
  padding-top: 22px;
}
</style>
