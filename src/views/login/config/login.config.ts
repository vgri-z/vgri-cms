export const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名为5-10位的字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码为3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
