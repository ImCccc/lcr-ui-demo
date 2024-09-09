import navLocale from '../i18n/pages/sidebar.json'

// 获取顶部导航栏
function getNav() {
  return Object.fromEntries(
    Object.entries(navLocale).map(([lang, locales]) => {
      const item: { link: string; text: string; activeMatch?: string }[] =
        Object.values(locales).map((item) => ({
          ...item,
          link: `/${lang}${item.link}`,
        }))

      return [lang, item]
    })
  )
}

export const nav = getNav()
