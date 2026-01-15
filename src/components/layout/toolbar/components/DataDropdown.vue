<script setup>
import { ElMessageBox } from 'element-plus'

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'data':
      handleData()
      break
    case 'curve':
      // 处理曲线命令
      handleCurve()
      break
    case 'bar':
      // 处理柱状命令
      handleBar()
      break
    case 'list': 
      // 处理列表命令
      handleList()
      break
    case 'history':
      // 处理历史数据命令
      handleHistory()
      break
    case 'import':
      handleImport()
      break
  }
}

// 处理数据
const handleData = () => {
  ElMessageBox.alert('数据功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

// 处理曲线
const handleCurve = () => {
  ElMessageBox.alert('曲线功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

// 处理柱状
const handleBar = () => {
  ElMessageBox.alert('柱状功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

// 处理列表
const handleList = () => {
  ElMessageBox.alert('列表功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

// 历史数据
const handleHistory = () => {
  ElMessageBox.alert('历史数据功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

// 导入数据
const handleImport = () => {
  ElMessageBox.alert('导入数据功能开发中', '数据', {
    confirmButtonText: '确定'
  })
}

</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">数据</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="data">数据</el-dropdown-item>
        <el-dropdown-item command="curve">曲线</el-dropdown-item>
        <el-dropdown-item command="bar">柱状</el-dropdown-item>
        <el-dropdown-item command="list">列表</el-dropdown-item>
        <el-dropdown-item command="history">历史数据</el-dropdown-item>
        <el-dropdown-item command="import">导入数据</el-dropdown-item>
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