// 获取左上角的导航信息
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLang } from './lang'

export const useNav = () => {
  const { theme } = useData()
  const lang = useLang()
  return computed(() => {
    return theme.value.nav[lang.value]
  })
}
