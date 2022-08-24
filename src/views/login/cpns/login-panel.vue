<template>
  <div class="login-panel">
    <h2 class="title">vgri-cms</h2>
    <login-account ref="accountRef" />
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginAccount from './login-account.vue'

const isKeepPassword = ref(false)
const accountRef = ref<InstanceType<typeof LoginAccount>>()

const handleLoginClick = () => {
  accountRef.value?.login()
}
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .title {
    margin-bottom: 10px;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
