import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/port',
      name: 'port',
      component: () => import('../views/PortSelect.vue')
    },
    {
      path: '/readPort',
      name: 'readPort',
      component: () => import('../views/ReadPort.vue')
    },
    {
      path: '/win',
      name: 'win',
      component: () => import('../views/WindowTest.vue')
    }
  ]
})

export default router
