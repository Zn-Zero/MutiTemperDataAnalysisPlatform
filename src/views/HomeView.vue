<script setup>
import { ElMenu, ElMenuItem } from 'element-plus';


const menus = reactive([
  {
    key: 'portTest',
    title: '串口连接',
    router: 'port'
  },
  {
    key: 'windowTest',
    title: '数据导入',
    router: 'window'
  },
])
</script>

<template>
    <ElMenu default-active="" @select="">
      <ElMenuItem v-for="(item, index) in menus" :index="index" :key="item.key">
            <ElLink type="primary" :underline="false" :href="item.router">{{item.title}}</ElLink>
      </ElMenuItem>
    </ElMenu>
</template>