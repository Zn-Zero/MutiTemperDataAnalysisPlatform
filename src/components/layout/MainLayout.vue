<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <!-- 顶部工具栏 -->
    <el-header height="50px" class="toolbar"><Toolbar /></el-header>
    
    <el-container>
      <!-- 左侧串口连接记录 -->
      <el-aside width="150px" class="sidebar"><SerialSidebar /></el-aside>
      <el-container>
        <!-- 主内容区域 -->
        <el-main class="main-content"><router-view /></el-main>
        <el-footer height="50px" style="padding: 0;"><Footer /></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import Toolbar from './Toolbar.vue'
import SerialSidebar from './Sidebar.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.toolbar {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}

.sidebar {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  overflow-y: auto;
}

.main-content {
  padding: 16px;
  overflow-y: auto;
}
</style>