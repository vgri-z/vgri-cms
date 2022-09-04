import type { App } from 'vue'
import formatUtlString from '@/utils/date-format'

export default function registerProperties(app: App) {
  // 在全局对象globalProperties添加的属性与方法可在任意的组件模板中使用
  // 一般在全局属性命名添加$符
  app.config.globalProperties.$filters = {
    name: 'vgri',
    formatTime: (value: string) => {
      return formatUtlString(value)
    }
  }
}
