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

// 获取对应语言的文本
export const t = (key) => {
  return localeMap[currentLocale][key] || key
}