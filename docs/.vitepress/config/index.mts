import consola from 'consola'
import { REPO_BRANCH, REPO_PATH } from '@element-plus/build-constants'
import { docsDirName } from '@element-plus/build-utils'
import { nav } from './nav'
import { mdPlugin } from './plugins'
import { sidebars } from './sidebars'

import type { UserConfig } from 'vitepress'

const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

consola.debug(`DOC_ENV: ${process.env.DOC_ENV}`)

const config: UserConfig = {
  // head,
  title: 'xxx 开发文档',
  lastUpdated: true,

  themeConfig: {
    repo: REPO_PATH,
    docsBranch: REPO_BRANCH,
    docsDir: docsDirName,
    editLinks: true,
    logo: '/images/element-plus-logo.svg',
    logoSmall: '/images/element-plus-logo-small.svg',
    sidebars, // 左侧导航
    nav, // 顶部导航
  },

  // 注册 markdown 插件
  markdown: {
    config: (md) => mdPlugin(md),
  },

  vue: {
    template: {
      compilerOptions: {
        hoistStatic: false,
        directiveTransforms: buildTransformers(),
      },
    },
  },

  postRender(context) {
    if (context.teleports) {
      const body = Object.entries(context.teleports).reduce(
        (all, [key, value]) => {
          if (key.startsWith('#el-popper-container-')) {
            return `${all}<div id="${key.slice(1)}">${value}</div>`
          }
          return all
        },
        context.teleports.body || ''
      )

      context.teleports = { ...context.teleports, body }
    }

    return context
  },
}
export default config
