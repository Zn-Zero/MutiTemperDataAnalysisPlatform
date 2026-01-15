<script setup>
import SerialPortForm from '@/components/dialog/serialPortForm.vue'
import { ElMessageBox } from 'element-plus'

const showPortFormDialog = ref(false)

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'newInc':
      handleAddInstrument()
      break
    case 'exit':
      handleExit()
      break
  }
}

// 添加仪器
const handleAddInstrument = () => {
  showPortFormDialog.value = true
}

// 退出
const handleExit = () => {
  ElMessageBox.confirm('确定要退出应用吗？', '退出', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    window.close()
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">菜单</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="newInc">添加仪器</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <serial-port-form v-model="showPortFormDialog" />
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