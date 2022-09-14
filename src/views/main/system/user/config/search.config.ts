import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 },
  formItems: [
    { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
    { field: 'realname', type: 'input', label: '真实姓名', placeholder: '请输入真实姓名' },
    { field: 'cellphone', type: 'input', label: '电话号码', placeholder: '请输入电话号码' },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
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
