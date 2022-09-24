<template>
  <div class="nav-header">
    <component :is="isFold ? 'Expand' : 'Fold'" @click="handleFold"></component>
    <div class="operate">
      <vgri-breadcrumbs :breadcrumbs="breadcrumbs" />
      <user-operate />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import UserOperate from './user-operate.vue'
import { VgriBreadcrumbs } from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { IBreadItem } from '../../../base-ui/breadcrumb/types/type'
import { pathToBreadcrumb } from '@/utils/mapMenus'
import { IMenuType } from '@/service/login/type'
import { vgriEmitter } from '@/utils/event'

const emits = defineEmits(['foldMenu'])
const isFold = ref(false)

const route = useRoute()
const store = useStore()

const breadcrumbs = computed<IBreadItem[]>(() => {
  const currentPath = route.path
  const userMenus = store.state.login.userMenus
  return pathToBreadcrumb(userMenus as IMenuType[], currentPath)
})

const handleFold = () => {
  isFold.value = !isFold.value
  emits('foldMenu', isFold.value)
  vgriEmitter.emit('echartResize')
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;

  .operate {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .breadcrumb {
      margin-left: 10px;
      align-self: center;
    }
  }
}
.el-icon {
  cursor: pointer;
}

svg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>
