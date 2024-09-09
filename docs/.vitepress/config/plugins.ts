import mdContainer from 'markdown-it-container'
import tableWrapper from '../plugins/table-wrapper'
import tooltip from '../plugins/tooltip'
import tag from '../plugins/tag'
import createDemoContainer from '../plugins/demo'
import type MarkdownIt from 'markdown-it'

export const mdPlugin = (md: MarkdownIt) => {
  md.use(tag) // 版本号显示组件
  md.use(tableWrapper) // table 组件
  md.use(tooltip) // 提示插件
  md.use(mdContainer, 'demo', createDemoContainer(md))
}
