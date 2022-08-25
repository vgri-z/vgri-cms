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
import LocalCache from '@/utils/cache'

const account = reactive({
  name: LocalCache.getCache('userName') ?? '',
  password: LocalCache.getCache('password') ?? ''
})
const formRef = ref<FormInstance>()

const login = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log(account)
      console.log('执行登录逻辑')
      if (isKeepPassword) {
        // 记住密码
        LocalCache.setCache('userName', account.name)
        LocalCache.setCache('password', account.password)
      } else {
        LocalCache.deleteCache('userName')
        LocalCache.deleteCache('password')
      }
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
