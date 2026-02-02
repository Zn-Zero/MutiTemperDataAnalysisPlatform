// electron-main/locale.js
// 主进程侧的语言文本（如窗口标题、菜单）
import zhCN from '../src/locales/zh-CN.js'
import enUS from '../src/locales/en-US.js'

const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 获取当前语言（优先从渲染进程同步，否则默认中文）
let currentLocale = 'en-US'

// 更新语言
export const updateLocale = (locale) => {
  if (localeMap[locale]) {
    currentLocale = locale
  }
}

const getByPath = (source, path) => {
  if (!source || !path) return undefined
  return path.split('.').reduce((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return value[segment]
    }
    return undefined
  }, source)
}

const formatMessage = (message, params) => {
  if (!params || typeof message !== 'string') return message
  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return key in params ? String(params[key]) : match
  })
}

// 获取对应语言的文本（支持层级路径、占位符替换、兜底语言）
export const t = (key, params) => {
  const currentMessages = localeMap[currentLocale]
  const fallbackMessages = localeMap['zh-CN']
  const value = getByPath(currentMessages, key) ?? getByPath(fallbackMessages, key)
  if (typeof value === 'string') return formatMessage(value, params)
  return key
}