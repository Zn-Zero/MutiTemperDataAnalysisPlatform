import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import * as path from 'path'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  plugins: [
    vue(),
    ElementPlus(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })
      ],
      imports: ['vue'],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({
      autoInstall: true,
    }),

    electron([
      {
        entry: 'electron-main/index.js',
      },
      {
        // Preload scripts entry file of the Electron App.
        entry: 'electron-preload/index.js',
        onstart(args) {
          // Notify the Renderer process to reload the page when the Preload scripts build is complete, 
          // instead of restarting the entire Electron App.
          args.reload()
        },
      }
    ]),
    electronRenderer(),
    // polyfillExports()
    VueI18n({
      // 指定语言包目录
      // include: path.resolve(__dirname, 'src/locales/**'),
      localeDir: path.resolve(__dirname, './src/locales'),
      runtimeOnly: false // 关闭运行时编译（优化性能）
    }),
  ],
  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  }
})
