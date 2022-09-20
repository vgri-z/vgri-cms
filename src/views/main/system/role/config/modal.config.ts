import type { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
      rules: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      rules: [{ required: true, message: '请输入权限介绍', trigger: 'blur' }]
    }
  ],
  colLayout: { span: 24 },
  labelWidth: '80px',
  formItemStyle: {
    padding: '0px'
  }
}
