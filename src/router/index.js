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
              params: { dataViewName: '仪表图' },
              component: () => import('../views/dataview/dataGrid.vue')
            },
            {
              path: 'bar',
              name: 'databar',
              params: { dataViewName: '柱状图' },
              component: () => import('../views/dataview/DataBar.vue')
            },
            {
              path: 'line',
              name: 'dataline',
              params: { dataViewName: '折线图' },
              component: () => import('../views/dataview/DataLine.vue')
            },
            {
              path: 'table',
              name: 'datatable',
              params: { dataViewName: '实时采集数据' },
              component: () => import('../views/dataview/DataTable.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
