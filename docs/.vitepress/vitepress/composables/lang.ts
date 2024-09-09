// 获取当前语言
import { computed } from 'vue'
import { defaultLang } from '../constant'

export const useLang = () => {
  return computed(() => {
    return defaultLang
  })
}
