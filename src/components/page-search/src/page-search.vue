<template>
  <div class="page-search">
    <vgri-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button type="primary" :icon="Search" @click="handleSearchClick">搜索</el-button>
          <el-button :icon="Refresh" @click="handleRestClick">重置</el-button>
        </div>
      </template>
    </vgri-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { VgriForm } from '@/base-ui/form/index'
import { Search, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'

const store = useStore()

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['searchBtnClick', 'resetBtnClick'])

// 双向绑定的属性应该有配置文件的field来决定
// 优化一：formData中的属性应该动态类决定
const formItems = props.searchFormConfig?.formItems ?? []
const originFormData: any = {}
for (const item of formItems) {
  originFormData[item.field] = ''
}

const formData = ref(originFormData)

// 同步更新vuex中保存的搜索参数
watch(formData, () => {
  store.commit('system/changePageQuery', formData.value)
})

const handleRestClick = () => {
  // 由于vgri-form对于传递过去的数据只是做了一层浅拷贝，所以修改深层的属性值，是可以监听到的
  // for (const key of Object.keys(originFormData)) {
  //   formData.value[key] = originFormData[key]
  // }
  formData.value = originFormData
  emits('resetBtnClick')
}

const handleSearchClick = () => {
  emits('searchBtnClick', formData.value)
}

// const formData = ref({
//   id: '',
//   name: '',
//   password: '',
//   hobbie: '',
//   createTime: ''
// })
</script>

<style scoped lang="less">
.header {
  color: red;
  padding: 10px 0;
}

.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
