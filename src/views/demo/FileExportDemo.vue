<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElEmpty, ElAlert, ElCard, ElTable, ElTableColumn, ElButton, ElHeader, ElMain } from 'element-plus'
import Papa from 'papaparse'

// 状态管理
const isLoading = ref(false)
const errorMessage = ref('')
const fileInfo = ref(null)
const tableData = ref([])
const tableColumns = ref([])
const rawData = ref([])
const pageSize = ref(200) // 分页加载大小
const currentPage = ref(1)
const isAllLoaded = ref(false)

// 处理文件选择
const handleSelectFile = async () => {
  try {
    // 重置状态
    resetState()
    isLoading.value = true

    // 1. 调用Electron API选择文件（非阻塞）
    const selectResult = await window.electronAPI.selectFile()
    if (selectResult.canceled) return

    // 2. 读取文件内容（主进程异步处理）
    const fileResult = await window.electronAPI.readFile(selectResult.filePaths[0])
    if (!fileResult.success) throw new Error(fileResult.error)

    fileInfo.value = {
      fileName: fileResult.fileName,
      encoding: fileResult.encoding,
      filePath: fileResult.filePath
    }

    // 3. 异步解析CSV（Web Worker非阻塞）
    await parseCsvData(fileResult.content)

    ElMessage.success(`解析成功！共 ${rawData.value.length} 行数据`)

  } catch (error) {
    errorMessage.value = error.message
    ElMessage.error(error.message)
  } finally {
    isLoading.value = false
  }
}

// CSV解析（核心：Web Worker异步处理）
const parseCsvData = (content) => {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      header: false,          // 第一行为列名
      skipEmptyLines: true,   // 跳过空行
      worker: true,           // 启用Web Worker，避免阻塞UI
      chunkSize: 10000,       // 分块解析，优化大文件
      complete: (result) => {
        if (result.errors.length) {
          reject(new Error(`解析错误: ${result.errors[0].message}`))
          return
        }

        // 处理解析结果（适配您的CSV格式）
        rawData.value = result.data
        if (rawData.value.length) {
          // 提取列名（第一行）
          tableColumns.value = rawData.value[0]
          // 提取数据（排除列名行）
          rawData.value = rawData.value.slice(1)
          // 加载第一页数据
          loadPageData(1)
        }
        resolve()
      },
      error: (error) => {
        reject(new Error(`解析失败: ${error.message}`))
      }
    })
  })
}

// 分页加载数据
const loadPageData = (pageNum) => {
  const start = (pageNum - 1) * pageSize.value
  const end = Math.min(start + pageSize.value, rawData.value.length)
  
  // 追加数据（避免覆盖）
  const newData = rawData.value.slice(start, end)
  tableData.value = [...tableData.value, ...newData]
  
  // 更新加载状态
  currentPage.value = pageNum
  isAllLoaded.value = end >= rawData.value.length
}

// 滚动加载更多
const loadMore = () => {
  if (isAllLoaded.value || isLoading.value) return
  loadPageData(currentPage.value + 1)
}

// 重置状态
const resetState = () => {
  isLoading.value = false
  errorMessage.value = ''
  fileInfo.value = null
  tableData.value = []
  tableColumns.value = []
  rawData.value = []
  currentPage.value = 1
  isAllLoaded.value = false
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部操作栏 -->
    <el-header class="app-header">
      <h1>CSV文件解析工具</h1>
      <el-button 
        @click="handleSelectFile" 
        type="primary" 
        icon="el-icon-upload"
        :loading="isLoading"
      >
        选择CSV文件
      </el-button>
    </el-header>

    <!-- 主内容区 -->
    <el-main class="app-main">
      <!-- 错误提示 -->
      <el-alert 
        v-if="errorMessage" 
        :message="errorMessage" 
        type="error" 
        closable 
        @close="errorMessage = ''"
        style="margin-bottom: 20px;"
      ></el-alert>

      <!-- 文件信息卡片 -->
      <el-card 
        v-if="fileInfo" 
        shadow="hover" 
        style="margin-bottom: 20px;"
      >
        <template #header>文件信息</template>
        <div class="file-info-grid">
          <div class="info-item">
            <span class="info-label">文件名：</span>
            <span class="info-value">{{ fileInfo.fileName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">编码格式：</span>
            <span class="info-value">{{ fileInfo.encoding }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">数据规模：</span>
            <span class="info-value">{{ tableData.length }} 行 × {{ tableColumns.length }} 列</span>
          </div>
        </div>
      </el-card>

      <!-- 数据表格（带加载状态） -->
      <el-table
        v-if="tableColumns.length"
        :data="tableData"
        border
        stripe
        size="small"
        :loading="isLoading"
        loading-text="正在解析数据..."
        style="width: 100%;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isAllLoaded"
        infinite-scroll-distance="10"
      >
        <el-table-column
          v-for="(column, index) in tableColumns"
          :key="index"
          :label="column"
          align="center"
        >
          <template #default="scope">
            {{ scope.row[index] }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态提示 -->
      <el-empty
        v-if="!isLoading && !tableColumns.length && !errorMessage"
        description="请选择CSV文件进行解析"
        image-size="120"
      ></el-empty>
    </el-main>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.file-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  color: #333;
}
</style>