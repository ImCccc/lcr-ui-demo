import ElementPlus, {
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'

import VPApp, { globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  Layout: VPApp,
  // app: vue 的实例
  enhanceApp: ({ app }) => {
    app.use(ElementPlus as any)
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    globals.forEach(([name, Comp]) => {
      // 注册全局组件，在 md 文档直接 <my-button/> 这样使用
      app.component(name, Comp as any)
    })
  },
})
