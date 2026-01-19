<script setup>
import Toolbar from './toolbar/Toolbar.vue'
import SerialSidebar from './Sidebar.vue'
import Footer from './Footer.vue'
import {
  Fold,
  Expand
} from '@element-plus/icons-vue'

const isFold = ref(false)


</script>

<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <!-- 顶部工具栏 -->
    <el-header height="30px" class="toolbar"><Toolbar /></el-header>
    
    <el-container>
      <!-- 左侧串口连接记录 -->
      <el-aside class="sidebar-container" :width="isFold ? '0px' : '250px'" :style="{ padding: isFold ? '5px 0' : '5px' }">
        <div :class="{ 'fold-icon': true, 'folded': isFold }">
          <el-icon v-if="!isFold" size="20" @click="isFold = true"><Fold /></el-icon>
          <el-icon v-else size="20" @click="isFold = false"><Expand /></el-icon>
        </div>
        <el-scrollbar style="height: 100%; padding-bottom: 20px;"><SerialSidebar /></el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 主内容区域 -->
        <el-main class="main-content"><router-view /></el-main>
        <el-footer height="50px" style="padding: 0;"><Footer /></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.toolbar {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}

.sidebar-container {
  height: calc(100vh - 30px);
  padding: 5px;
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  overflow: visible;
  position: relative;
  transition: all 0.3s ease;

  .fold-icon {
    position: absolute;
    top: 8px;
    right: 5px;
    z-index: 10;
    cursor: pointer;

    transition: all 0.3s ease;

    &.folded {
      right: -10px;
      background-color: #f5f7fa;
      border: 1px solid #e4e7ed;
      border-left: none;
      border-radius: 0 4px 4px 0;
      padding: 5px 5px 0 5px;
      // box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

      &:hover {
        right: -30px;
      }
    }
  }
}

.main-content {
  padding: 16px;
  overflow-y: auto;
}

:deep(.el-footer) {
  transition: all 0.3s ease;
  user-select: none;
}
</style>