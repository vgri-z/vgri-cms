import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    { filed: 'name', type: 'input', label: '角色名', placeholder: '请输入用户名' },
    { filed: 'intro', type: 'input', label: '权限介绍', placeholder: '请输入权限介绍' },
    {
      filed: 'createTime',
      type: 'datePicker',
      label: '创建时间',
      otherOptions: {
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ]
}
