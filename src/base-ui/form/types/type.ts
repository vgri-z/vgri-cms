import { FormItemRule } from 'element-plus'

// 表单项的类型，根据类型动态渲染表单项
export type IFormType = 'input' | 'password' | 'select' | 'datePicker'

export interface IOption {
  label: string
  value: any
}

export interface IFormItem {
  field: string // 表单绑定的字段名称
  type: string
  label: string
  rules?: FormItemRule[]
  placeholder?: any
  // 针对select
  options?: IOption[]
  // 针对datePicker的一些其他属性，就全部放在otherOptions里面，比如start-placeholder/end-placeholder/type等等
  // 每一个表单项可能都有各自的一些特殊的其他属性，如果要用到，都可以将这些属性放在otherOptions里面，然后通过v-bind直接绑定
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  formItemStyle?: any
  colLayout?: any
}
