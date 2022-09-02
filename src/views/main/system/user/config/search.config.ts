import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 },
  formItems: [
    {
      filed: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    { filed: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
    { filed: 'password', type: 'password', label: '密码', placeholder: '请输入密码' },
    {
      filed: 'hobbie',
      type: 'select',
      label: '兴趣爱好',
      placeholder: '请选择兴趣爱好',
      options: [
        { label: '音乐', value: 'music' },
        { label: '语言', value: 'language' }
      ]
    },
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
