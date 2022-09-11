export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', 'min-width': '100' },
    { prop: 'oldPrice', label: '原价', 'min-width': '60', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价', 'min-width': '60', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', 'min-width': '80', slotName: 'goodsImage' },
    { prop: 'status', label: '状态', 'min-width': '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', 'min-width': '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', 'min-width': '200', slotName: 'updateAt' },
    { label: '操作', 'min-width': '140', slotName: 'handler' }
  ],
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: false
}
