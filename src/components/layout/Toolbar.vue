<template>
  <div class="toolbar-content">
    <!-- 导入文件按钮 -->
    <el-button 
      type="primary" 
      icon="Upload" 
      @click="handleImport"
    >
      导入文件
    </el-button>
    
    <!-- 数据导出按钮 -->
    <el-button 
      type="success" 
      icon="Download" 
      @click="handleExport"
    >
      导出数据
    </el-button>
    
    <!-- 图表设置按钮 -->
    <el-button 
      type="default" 
      icon="Setting" 
      @click="handleChartSettings"
    >
      图表设置
    </el-button>
    
    <!-- 帮助按钮 -->
    <el-button 
      type="default" 
      icon="Help" 
      @click="handleHelp"
    >
      帮助
    </el-button>
    
    <!-- 分隔符 -->
    <div class="divider"></div>
    
    <!-- 状态栏信息 -->
    <div class="status-info">
      <span v-if="connectedPort">已连接: {{ connectedPort.name }}</span>
      <span v-else>未连接设备</span>
    </div>
  </div>
</template>

<script setup>
import { usePortStore } from '@/stores/port'
import FileImporter from '../common/FileImporter.vue'
import { ElMessageBox } from 'element-plus'

const portStore = usePortStore()
const connectedPort = portStore.getOpenedPort()

// 处理文件导入
const handleImport = () => {
  FileImporter.show().then(file => {
    // 跳转到数据分析页面
    router.push({
      path: '/analysis',
      query: { file: file.path }
    })
  })
}

// 处理数据导出
const handleExport = () => {
  ElMessageBox.alert('数据导出功能开发中', '提示', {
    confirmButtonText: '确定'
  })
}

// 图表设置
const handleChartSettings = () => {
  ElMessageBox.alert('图表设置功能开发中', '提示', {
    confirmButtonText: '确定'
  })
}

// 帮助
const handleHelp = () => {
  ElMessageBox.alert('使用帮助文档开发中', '帮助', {
    confirmButtonText: '确定'
  })
}
</script>

<style scoped>
.toolbar-content {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e4e7ed;
  margin: 0 10px;
}

.status-info {
  margin-left: auto;
  color: #606266;
  font-size: 14px;
}
</style>