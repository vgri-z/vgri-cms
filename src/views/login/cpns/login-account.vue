<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="account"
      :rules="rules"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { ref, reactive, defineExpose } from 'vue'
import { rules } from '../config/login.config'

const account = reactive({
  name: '',
  password: ''
})
const formRef = ref<FormInstance>()

const login = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log(account)
      console.log('执行登录逻辑')
    }
  })
}

// 通过defineExpose将组件的属性或者方法暴露出去，以便父组件通过实例调用
defineExpose({
  login
})
</script>

<style scoped lang="less">
:deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.5);
}
</style>
