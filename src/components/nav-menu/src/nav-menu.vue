<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/imgs/logo.svg" alt="logo" />
      <span class="title">vgri-cms</span>
    </div>
    <!-- 菜单 -->
    <el-menu default-active="2" class="el-menu-vertical"> </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'

// 这里的store是Store<any>类型的，any类型用起来不安全
const store = useStore()
const userMenus = store.state.login.userMenus
</script>

<style scoped lang="less">
.nav-menu {
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
