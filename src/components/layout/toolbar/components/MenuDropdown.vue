<script setup>
import SerialPortForm from '@/components/dialog/SerialPortForm.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPortFormDialog = ref(false)
const fullScreen = ref(false)

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'newInc':
      handleAddInstrument()
      break
    case 'home':
      handleHome()
      break
    case 'fullScreen':
      handleFullScreen()
      break
    case 'exitfullScreen':
      handleExitFullScreen()
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

// 添加仪器
const handleHome = () => {
  router.push('/')
}

// 全屏
const handleFullScreen = () => {
  
  // if (fullScreen.value) {
  //   window.osApi.exitFullScreen()
  // } else {
  //   window.osApi.fullScreen()
  // }
  window.osApi.fullScreen()

  fullScreen.value = window.osApi.isFullScreen()
}

// 退出全屏
const handleExitFullScreen = () => {
  if (!fullScreen.value) return
  window.osApi.exitFullScreen()
  fullScreen.value = false
}

// 退出
const handleExit = () => {
  ElMessageBox.confirm('确定要退出应用吗？', '退出', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // todo 退出前保存所有配置和数据，断开端口连接，再执行退出操作
    window.osApi.closeWindow()
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">菜单</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="newInc">添加仪器</el-dropdown-item>
        <!-- <el-dropdown-item v-if="router.currentRoute.value.fullPath !== '/home'" command="home">返回首页</el-dropdown-item> -->
        <el-dropdown-item v-if="!fullScreen" command="fullScreen">全屏</el-dropdown-item>
        <el-dropdown-item v-else command="exitfullScreen">退出全屏</el-dropdown-item>
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