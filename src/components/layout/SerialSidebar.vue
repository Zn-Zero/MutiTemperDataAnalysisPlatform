<template>
  <div class="serial-sidebar">
    <div class="sidebar-header">
      <h3>串口连接记录</h3>
    </div>
    
    <!-- 新增连接按钮 -->
    <el-button 
      class="add-connection-btn"
      type="primary" 
      icon="Plus" 
      @click="showAddForm = true"
    >
      新增连接
    </el-button>
    
    <!-- 新增连接表单 -->
    <el-collapse v-model="activeNames" v-if="showAddForm">
      <el-collapse-item title="配置新连接" name="1">
        <SerialConfigForm 
          @confirm="handleAddConnection"
          @cancel="showAddForm = false"
        />
      </el-collapse-item>
    </el-collapse>
    
    <!-- 连接记录列表 -->
    <el-list
      v-if="connectionHistory.length > 0"
      item-layout="horizontal"
      border
      class="connection-list"
    >
      <el-list-item 
        v-for="(item, index) in connectionHistory" 
        :key="index"
        :class="{ 'active-connection': item.isConnected }"
      >
        <el-list-item__content>
          <div class="connection-name">{{ item.name }}</div>
          <div class="connection-details">
            <span>{{ item.path }}</span>
            <span>{{ item.baudRate }} 波特率</span>
          </div>
        </el-list-item__content>
        <el-list-item__actions>
          <el-button 
            size="small" 
            @click="handleConnect(item)"
            v-if="!item.isConnected"
          >
            连接
          </el-button>
          <el-button 
            size="small" 
            type="danger"
            @click="handleDisconnect(item)"
            v-if="item.isConnected"
          >
            断开
          </el-button>
          <el-button 
            size="small" 
            icon="Edit"
            @click="handleEdit(item, index)"
          />
          <el-button 
            size="small" 
            icon="Delete"
            type="text"
            @click="handleDelete(index)"
          />
        </el-list-item__actions>
      </el-list-item>
    </el-list>
    
    <div v-else class="empty-hint">
      暂无连接记录，请添加新连接
    </div>
    
    <!-- 温度上下限设置 (连接状态下显示) -->
    <el-collapse v-if="showThresholdForm">
      <el-collapse-item title="温度上下限设置" name="2">
        <TempThresholdForm 
          :channel-count="connectedChannels"
          @save="handleSaveThresholds"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSerialHistoryStore } from '@/stores/serialHistory'
import { usePortStore } from '@/stores/port'
import SerialConfigForm from '../serial/SerialConfigForm.vue'
import TempThresholdForm from '../serial/TempThresholdForm.vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { checkAndCloseAllPorts } from '@/utils/serialUtils'

// 状态管理
const serialHistoryStore = useSerialHistoryStore()
const portStore = usePortStore()

// 响应式数据
const connectionHistory = ref([])
const showAddForm = ref(false)
const activeNames = ref(['1'])
const showThresholdForm = ref(false)
const connectedChannels = ref(64) // 默认64路

// 初始化
onMounted(() => {
  // 从本地加载连接历史
  connectionHistory.value = serialHistoryStore.loadHistory()
  
  // 检查是否有已连接的端口
  checkConnectedStatus()
})

// 检查连接状态
const checkConnectedStatus = () => {
  const openedPort = portStore.getOpenedPort()
  if (openedPort.port) {
    connectionHistory.value = connectionHistory.value.map(item => ({
      ...item,
      isConnected: item.path === openedPort.port.path
    }))
    showThresholdForm.value = true
  }
}

// 处理新增连接
const handleAddConnection = async (config) => {
  // 检查是否需要断开已有连接
  const openedPort = portStore.getOpenedPort()
  if (openedPort.port) {
    const { confirm } = await ElMessageBox.confirm(
      '已有连接，是否断开现有连接并建立新连接？',
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    if (!confirm) return
    
    // 断开现有连接
    try {
      await checkAndCloseAllPorts()
    } catch (error) {
      ElNotification.error({
        title: '错误',
        message: '断开现有连接失败: ' + error.message
      })
      return
    }
  }
  
  // 添加新连接到历史记录
  const newConnection = {
    ...config,
    id: Date.now(),
    isConnected: false,
    lastConnected: null
  }
  
  connectionHistory.value.push(newConnection)
  serialHistoryStore.saveHistory(connectionHistory.value)
  
  // 尝试连接
  handleConnect(newConnection)
  
  showAddForm.value = false
}

// 处理连接
const handleConnect = async (item) => {
  try {
    // 连接串口的逻辑 (实际实现由用户提供)
    // 这里仅做状态更新演示
    connectionHistory.value = connectionHistory.value.map(conn => ({
      ...conn,
      isConnected: conn.id === item.id
    }))
    
    item.lastConnected = new Date().toISOString()
    serialHistoryStore.saveHistory(connectionHistory.value)
    
    // 更新端口状态
    portStore.setOpenedPort(item, null)
    
    showThresholdForm.value = true
    
    ElNotification.success({
      title: '成功',
      message: `已连接到 ${item.name}`
    })
  } catch (error) {
    ElNotification.error({
      title: '连接失败',
      message: error.message
    })
  }
}

// 处理断开连接
const handleDisconnect = async (item) => {
  try {
    // 断开连接的逻辑 (实际实现由用户提供)
    connectionHistory.value = connectionHistory.value.map(conn => ({
      ...conn,
      isConnected: false
    }))
    
    serialHistoryStore.saveHistory(connectionHistory.value)
    portStore.removeOpenedPort()
    showThresholdForm.value = false
    
    ElNotification.success({
      title: '成功',
      message: `已断开与 ${item.name} 的连接`
    })
  } catch (error) {
    ElNotification.error({
      title: '断开失败',
      message: error.message
    })
  }
}

// 处理编辑
const handleEdit = (item, index) => {
  // 编辑连接配置
  showAddForm.value = true
  // 这里需要将item数据传入SerialConfigForm进行编辑
}

// 处理删除
const handleDelete = async (index) => {
  const item = connectionHistory.value[index]
  
  if (item.isConnected) {
    ElNotification.warning({
      title: '提示',
      message: '请先断开连接再删除'
    })
    return
  }
  
  const { confirm } = await ElMessageBox.confirm(
    `确定要删除连接 "${item.name}" 吗？`,
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  
  if (confirm) {
    connectionHistory.value.splice(index, 1)
    serialHistoryStore.saveHistory(connectionHistory.value)
    ElNotification.success({
      title: '成功',
      message: '连接记录已删除'
    })
  }
}

// 保存温度上下限
const handleSaveThresholds = (thresholds) => {
  // 保存温度上下限的逻辑
  ElNotification.success({
    title: '成功',
    message: '温度上下限已保存'
  })
}
</script>

<style scoped>
.serial-sidebar {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar-header {
  margin-bottom: 16px;
}

.add-connection-btn {
  width: 100%;
  margin-bottom: 16px;
}

.connection-list {
  margin-bottom: 16px;
  max-height: calc(100% - 240px);
  overflow-y: auto;
}

.connection-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.connection-details {
  display: flex;
  gap: 10px;
  color: #606266;
  font-size: 12px;
}

.active-connection {
  background-color: #f0f7ff;
}

.empty-hint {
  text-align: center;
  padding: 20px;
  color: #909399;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>