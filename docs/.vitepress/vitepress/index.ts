import 'normalize.css'
import '../../../packages/theme-chalk/src/reset.scss'
import '../../../packages/theme-chalk/src/index.scss'
import '../../../packages/theme-chalk/src/dark/css-vars.scss'
import './styles/css-vars.scss'
import './styles/app.scss'
import 'uno.css'
import VPApp from './components/vp-app.vue'
import VPDemo from './components/vp-demo.vue'
import ApiTyping from './components/globals/vp-api-typing.vue'
import Overview from './components/globals/overview.vue'
import type { Component } from 'vue'

export default VPApp

// 暴露一些在md文档直接使用的全局组件
export const globals: [string, Component][] = [
  ['Demo', VPDemo],
  ['Overview', Overview],
  ['ApiTyping', ApiTyping],
]
