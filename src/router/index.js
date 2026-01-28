import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component:  () => import('../views/HomeView.vue')
        },
        {
          path: '/demo',
          children: [
            {
              path: 'port',
              name: 'port',
              component: () => import('../views/demo/PortSelectDemo.vue'),
              children: [
                {
                  path: 'read',
                  name: 'read',
                  component: () => import('../views/demo/ReadPortDemo.vue')
                }
              ]
            },
            {
              path: 'file',
              name: 'file',
              component: () => import('../views/demo/FileExportDemo.vue')
            }
          ]
        },
        {
          path: '/data',
          children: [
            {
              path: 'grid',
              name: 'datagrid',
              component: () => import('../views/dataview/DataGrid.vue')
            },
            {
              path: 'bar',
              name: 'databar',
              component: () => import('../views/dataview/DataBar.vue')
            },
            {
              path: 'line',
              name: 'dataline',
              component: () => import('../views/dataview/DataLine.vue')
            },
            {
              path: 'table',
              name: 'datatable',
              component: () => import('../views/dataview/DataTable.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
