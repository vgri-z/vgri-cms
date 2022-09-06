<template>
  <div class="vgri-table">
    <!-- 一般一个项目中的表格的头部，除了操作按钮部分可能有差异，其余应该都一样，
      所以统一设置默认值就可以了，然后在使用的时候，对有差异的操作按钮部分进行修改 -->
    <div class="header">
      <slot name="tableHeader">
        <div class="title">{{ title }}</div>
        <div class="handle-btns">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row" :text="'vgri'">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <!-- 表格的footer基本都是分页 -->
      <slot name="footer">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, watch } from 'vue'

interface Props {
  listData: any[]
  propList: any[]
  showIndexColumn: boolean // 是否显示序号列
  showSelectColumn: boolean // 是否显示多选框列
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  listData: () => [],
  propList: () => [],
  showIndexColumn: false,
  showSelectColumn: true,
  title: ''
})

watch(
  () => props.propList,
  (newValue) => {
    console.log(newValue)
  },
  {
    deep: true
  }
)

const emits = defineEmits(['selectChange'])

const handleSelectionChange = (event: any[]) => {
  emits('selectChange', event)
}
</script>

<style scoped lang="less">
.vgri-table {
  .header {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .handle-btns {
      margin-bottom: 5px;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
}
</style>
