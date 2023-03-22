import { Language } from '@/types'

// Utility function to get a cookie by name
export function getCookie (cookieName: string): string | null {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${encodeURIComponent(cookieName)})=([^;]*)`))
  return match ? decodeURIComponent(match[3]) : null
}

// Utility function to set a cookie
export function setCookie (cookieName: string, value: string, options: {
  expires?: number
  path?: string
  domain?: string
  secure?: boolean
} = {}): void {
  let cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`

  if (options.expires) {
    const date = new Date()
    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }

  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  if (options.secure) {
    cookieString += '; secure'
  }

  document.cookie = cookieString
}

export function getLang (cookieName?: string): Language {
  let lang

  if (cookieName) {
    lang = getCookie(cookieName)?.toLowerCase()
    if (lang === 'zh-cn' || lang === 'en-us') {
      return lang
    }
  }

  try {
    lang = navigator.language.toLowerCase()
  } catch (e) {
    console.error(e)
    lang = 'zh-cn'
  }
  if (lang === 'zh-cn' || lang === 'en-us') {
    return lang
  }

  if (lang.startsWith('zh')) {
    return 'zh-cn'
  } else if (lang.startsWith('en')) {
    return 'en-us'
  } else {
    return 'zh-cn'
  }
}
