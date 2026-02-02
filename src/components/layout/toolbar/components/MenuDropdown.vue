<script setup>
import InstrumentForm from '@/components/dialog/instrument/index.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const instrumentFormVisible = ref(false)
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
  instrumentFormVisible.value = true
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
  ElMessageBox.confirm(t('components.layout.toolbar.menudropdown.confirm_exit'), t('components.layout.toolbar.menudropdown.exit'), { // 确定要退出应用吗？  // 退出
    confirmButtonText: t('components.layout.toolbar.menudropdown.confirm'), // 确定
    cancelButtonText: t('components.layout.toolbar.menudropdown.cancel'), // 取消
    type: 'warning'
  }).then(() => {
    // todo 退出前保存所有配置和数据，断开端口连接，再执行退出操作
    window.osApi.closeWindow()
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">{{ $t('components.layout.toolbar.menudropdown.menu') }}</el-text><!-- 菜单 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="newInc">{{ $t('components.layout.toolbar.menudropdown.add_instrument') }}</el-dropdown-item><!-- 添加仪器 -->
        <!-- <el-dropdown-item v-if="router.currentRoute.value.fullPath !== '/home'" command="home">{{ $t('components.layout.toolbar.menudropdown.return_home') }}</el-dropdown-item> --><!-- 返回首页 -->
        <el-dropdown-item v-if="!fullScreen" command="fullScreen">{{ $t('components.layout.toolbar.menudropdown.fullscreen') }}</el-dropdown-item><!-- 全屏 -->
        <el-dropdown-item v-else command="exitfullScreen">{{ $t('components.layout.toolbar.menudropdown.exit_fullscreen') }}</el-dropdown-item><!-- 退出全屏 -->
        <el-dropdown-item command="exit">{{ $t('components.layout.toolbar.menudropdown.exit') }}</el-dropdown-item><!-- 退出 -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <instrument-form v-model="instrumentFormVisible" />
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