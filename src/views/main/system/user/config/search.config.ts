import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 },
  formItems: [
    {
      type: 'input',
      label: '电脑名称',
      placeholder: '请输入电脑名称'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '兴趣爱好',
      placeholder: '请选择兴趣爱好',
      options: [
        { label: '音乐', value: 'music' },
        { label: '语言', value: 'language' }
      ]
    },
    {
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
