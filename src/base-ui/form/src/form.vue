<template>
  <div class="vgri-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" ref="formRef" :model="modelValue">
      <el-row>
        <template v-for="item in formItems" :key="item.lable">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :label-width="labelWidth"
              :style="formItemStyle"
              :rules="item.rules"
              :prop="item.field"
            >
              <!-- input/password -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password' ? true : false"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleModelValueChange($event, item.field)"
                />
              </template>
              <!-- select -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleModelValueChange($event, item.field)"
                >
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
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleModelValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, withDefaults, defineProps, defineEmits, defineExpose } from 'vue'
import { IFormItem } from '../types/type'

const formRef = ref<FormInstance>()

// props?????????????????????????????????????????????????????????????????????????????????
interface Props {
  formItems: IFormItem[]
  labelWidth: string
  formItemStyle: any
  colLayout: any
  modelValue: any
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
  },
  modelValue: {}
})

const emits = defineEmits(['update:modelValue'])

const handleModelValueChange = (value: any, field: string) => {
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}

// ????????????
const vgriFormValidate = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      resolve(valid)
    })
  })
}

defineExpose({
  vgriFormValidate
})

// ????????????????????????????????????????????????
// const formData = ref({ ...props.modelValue })

// console.log(formData)

// watch(
//   formData,
//   (newValue) => {
//     // console.log(newValue)
//     emits('update:modelValue', newValue)
//   },
//   { deep: true }
// )

// const formData = computed({
//   get: () => props.modelValue,
//   set: (newValue) => {
//     // ??????????????????????????????????????????set????????????????????????
//     console.log('==========')
//     emits('update:modelchange', newValue)
//   }
// })
</script>

<style scoped lang="less">
.vgri-form {
  padding-top: 22px;
}
</style>
