import { createI18n } from 'vue-i18n';
// 导入语言包
import zhCN from './zh-CN';
import enUS from './en-US';

// 定义语言映射
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
};

// 从本地存储读取默认语言（优先），否则用浏览器语言
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('app-locale');
  if (savedLocale && ['zh-CN', 'en-US'].includes(savedLocale)) {
    return savedLocale;
  }
  return navigator.language || 'en-US';
};

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 必须设置为 false（Vue3 组合式 API 要求）
  globalInjection: true, // 全局注入 $t 方法
  locale: getDefaultLocale(), // 默认语言
  fallbackLocale: 'en-US', // 兜底语言
  messages
});

export default i18n;