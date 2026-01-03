<script setup>
import {
  HomeFilled,
  Connection,
  Files
} from '@element-plus/icons-vue'
const menus = reactive([
  {
    key: 'home',
    title: '首页',
    router: '/',
    icon: HomeFilled
  },
  {
    key: 'portTest',
    title: '串口连接',
    router: '/port',
    icon: Connection
  },
  {
    key: 'fileExport',
    title: '数据导入',
    router: '/file',
    icon: Files
  }
])
</script>

<template>
  <el-menu default-active="" background-color="#f5f7fa" :collapse="false" style="border-right: none;">
    <el-menu-item class="menu-item" v-for="(item, index) in menus" :index="index" :key="item.key">
      <el-link :underline="false" :href="item.router">
        <el-icon><component :is="item.icon" /></el-icon>
        {{item.title}}
      </el-link>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    transform: scaleY(0);                 // 初始高度为0
    transform-origin: center;             // 从中间向上下展开
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: unset;
    &::before {
      transform: scaleY(1);               // 展开竖线
    }
  }

  .el-link { 
    display: block;
    width: 100%;
    &:hover {
      background-color: unset;
    }
  }
}
</style>