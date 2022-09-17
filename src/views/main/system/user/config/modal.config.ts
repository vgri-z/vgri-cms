import type { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      rules: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入用户密码',
      isHidden: false,
      rules: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      rules: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
        {
          pattern: /^(0|86|17951)?(1[3-9])[0-9]{9}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: [],
      rules: [{ required: true, message: '请选择部门', trigger: 'change' }],
      otherOptions: {
        clearable: true
      }
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: [],
      rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
      otherOptions: {
        clearable: true
      }
    }
  ],
  colLayout: { span: 24 },
  labelWidth: '80px',
  formItemStyle: {
    padding: '0px'
  }
}
