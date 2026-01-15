<script setup>
import { ElMessageBox } from 'element-plus'
// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'start':
      handleStartCommunication()
      break
    case 'stop':
      handleStopCommunication()
      break
  }
}

// 开始采集
const handleStartCommunication = () => {
  ElMessageBox.alert('开始采集功能开发中', '通讯', {
    confirmButtonText: '确定'
  })
}

// 停止采集
const handleStopCommunication = () => {
  ElMessageBox.alert('停止采集功能开发中', '通讯', {
    confirmButtonText: '确定'
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">通讯</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="start">开始</el-dropdown-item>
        <el-dropdown-item command="stop">停止</el-dropdown-item>
        <el-dropdown-item disabled>屏幕校准</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown {
  border: none;
  height: 100%;
}
.menu-text{
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  color: #303133;
  border: none;
}
</style>