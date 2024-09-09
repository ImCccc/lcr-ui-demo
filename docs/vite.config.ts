import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig, loadEnv } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import {
  docPackage,
  epPackage,
  getPackageDependencies,
  projRoot,
} from '@element-plus/build-utils'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

import type { Alias } from 'vite'

// 配置别名
const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
]

// 非生产环境，加载 element-plus 开头的组件，定位到 packages 目录下
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^element-plus(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
    },
    {
      find: /^element-plus\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const { dependencies: epDeps } = getPackageDependencies(epPackage)
  const { dependencies: docsDeps } = getPackageDependencies(docPackage)

  const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
    (dep) =>
      !dep.startsWith('@types/') &&
      !['@element-plus/metadata', 'element-plus'].includes(dep)
  )

  optimizeDeps.push(
    ...(await glob(['dayjs/plugin/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
      onlyFiles: true,
    }))
  )

  return {
    server: {
      host: true,
      https: !!env.HTTPS,
      fs: {
        allow: [projRoot],
      },
    },

    resolve: {
      alias,
    },

    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        hoistStatic: { exclude: ['./**/*.vue'] },
        plugins: { vueJsx: vueJsx() },
      }),
      // 按需组件自动导入
      Components({
        // 定义导入组件的路径，默认情况下，此插件将导入src/components路径中的组件。
        dirs: ['.vitepress/vitepress/components'],
        //允许组件覆盖同名的其他组件
        allowOverrides: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      Icons({ autoInstall: true }),
      UnoCSS(),
      MarkdownTransform(), // md 插件
      /*
        vite-plugin-inspect插件让浏览器看到vue编译后的代码
        启动开发模式成功会弹出3个地址，最后一个就是：http://localhost:5173/__inspect/
      */
      Inspect(),
      /* https 请求提供证书支持 */
      mkcert(),
    ],

    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    optimizeDeps: {
      include: optimizeDeps,
    },
  }
})
