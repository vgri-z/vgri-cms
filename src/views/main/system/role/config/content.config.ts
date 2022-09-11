export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '角色名称', 'min-width': '100' },
    { prop: 'intro', label: '权限介绍', 'min-width': '100' },
    { prop: 'createAt', label: '创建时间', 'min-width': '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' },
    { label: '操作', 'min-width': '140', slotName: 'handler' }
  ],
  title: '角色列表',
  showIndexColumn: true,
  showSelectColumn: true,
  createText: '新建角色'
}
