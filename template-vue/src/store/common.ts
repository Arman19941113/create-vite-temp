import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLang, setCookie } from '@/utils'
import { COOKIE_LANG } from '@/const'
import { Language } from '@/types'

export const useCommonStore = defineStore('common', () => {
  const lang = ref(getLang(COOKIE_LANG))
  const setLang = (val: Language) => {
    setCookie(COOKIE_LANG, val)
    lang.value = val
  }

  return {
    lang,
    setLang,
  }
})
