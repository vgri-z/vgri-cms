export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '用户名', 'min-width': '100' },
    { prop: 'realname', label: '真实姓名', 'min-width': '100' },
    { prop: 'cellphone', label: '手机号码', 'min-width': '100' },
    { prop: 'enable', label: '状态', 'min-width': '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', 'min-width': '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' },
    { label: '操作', 'min-width': '140', slotName: 'handler' }
  ],
  title: '用户列表',
  showIndexColumn: true,
  showSelectColumn: true
}
