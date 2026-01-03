import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/port',
          name: 'port',
          component: () => import('../views/demo/PortSelectDemo.vue')
        },
        {
          path: '/readPort',
          name: 'readPort',
          component: () => import('../views/demo/ReadPortDemo.vue')
        },
        {
          path: '/file',
          name: 'file',
          component: () => import('../views/demo/FileExportDemo.vue')
        }
      ]
    }
  ]
})

export default router
