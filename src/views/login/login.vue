<template>
  <div class="login">
    <time-travel />
    <login-panel />
  </div>
</template>

<script lang="ts" setup>
import { TimeTravel } from '../../base-ui/timeTravel/index'
import LoginPanel from './cpns/login-panel.vue'
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
