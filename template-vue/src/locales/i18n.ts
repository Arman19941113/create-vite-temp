import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { useCommonStore } from '@/store'
import { zhCN, enUS } from '@/locales'

export function initI18n () {

  const common = useCommonStore()

  const i18n = createI18n({
    legacy: false,
    locale: common.lang,
    fallbackLocale: 'zh-cn',
    messages: {
      'zh-cn': zhCN,
      'en-us': enUS,
    },
  })

  watch(() => common.lang, val => {
    i18n.global.locale.value = val
  })

  return i18n
}
