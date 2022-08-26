<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/imgs/logo.svg" alt="logo" />
      <span class="title">vgri-cms</span>
    </div>
    <!-- 菜单 -->
    <el-menu default-active="2" class="el-menu-vertical">
      <template v-for="item in userMenus" :key="item.id">
        <!-- 有二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu>
            <template #title>
              <template v-if="item.icon">
                <component :class="item.iconName" :is="item.iconName"></component>
              </template>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item>
                <template v-if="subitem.icon">
                  <component :class="subitem.iconName" :is="subitem.iconName"></component>
                </template>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有二级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <template v-if="item.icon">
              <component :class="item.iconName" :is="item.iconName"></component>
            </template>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'

// 这里的store是Store<any>类型的，any类型用起来不安全
const store = useStore()
const userMenus = store.state.login.userMenus!.map((item) => {
  item.iconName = item.icon.split('-')[2]
  if (item.name === '随便聊聊') {
    item.iconName = 'ChatLineRound'
  }
  return item
})
console.log(userMenus)
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

  .el-menu {
    border-right: none;
    background: #001429;
  }

  // 目录
  .el-submenu {
    background-color: #001429 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #001429 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #001429 !important;

    .el-icon.el-sub-menu__icon-arrow {
      position: absolute;
    }

    // 修改菜单图标大小
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  // 选中之后菜单高亮颜色
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3396fb !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
