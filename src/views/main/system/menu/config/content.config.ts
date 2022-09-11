export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', 'min-width': '120' },
    { prop: 'type', label: '菜单类型', 'min-width': '80' },
    { prop: 'url', label: '菜单url', 'min-width': '100' },
    { prop: 'icon', label: '菜单icon', 'min-width': '100' },
    { prop: 'permission', label: '按钮权限', 'min-width': '100' },
    { prop: 'createAt', label: '创建时间', 'min-width': '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' },
    { label: '操作', 'min-width': '140', slotName: 'handler' }
  ],
  title: '菜单列表',
  isShowFooter: false,
  childrenProps: {
    rowKey: 'id',
    treeProps: { children: 'children', hasChildren: 'hasChildren' }
  },
  createText: '新建菜单'
}
