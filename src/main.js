import i18n from './locales'; // 导入 i18n 实例
import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(createPinia())
app.use(router)
app.use(i18n)

// 初始化 Element Plus 语言（关联 i18n 当前语言）
const setElementPlus = () => {
  const currentLocale = i18n.global.locale.value
  const elLocale = i18n.global.messages.value[currentLocale].elLocale
  app.use(ElementPlus, {
    locale: elLocale,
    size: 'default'
  })
}
setElementPlus()

// 监听语言变化并更新 ElementPlus 语言
watch(
  () => i18n.global.locale.value, // 监听 locale 响应式变化
  (newLocale) => {
    // 通知 Electron 主进程更新语言
    window.osApi.changeLocale(newLocale);
    // 更新 Element Plus 语言
    setElementPlus()
  },
  { immediate: true } // 立即执行一次（初始化）
)


app.mount('#app')