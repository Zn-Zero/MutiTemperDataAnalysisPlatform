<script setup>
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  ElMessageBox.alert(t('components.layout.toolbar.communicationdropdown.start_feature_in_development'), t('components.layout.toolbar.communicationdropdown.communication'), { // 开始采集功能开发中  // 通讯
    confirmButtonText: t('components.layout.toolbar.communicationdropdown.confirm') // 确定
  })
}

// 停止采集
const handleStopCommunication = () => {
  ElMessageBox.alert(t('components.layout.toolbar.communicationdropdown.stop_feature_in_development'), t('components.layout.toolbar.communicationdropdown.communication'), { // 停止采集功能开发中  // 通讯
    confirmButtonText: t('components.layout.toolbar.communicationdropdown.confirm') // 确定
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">{{ $t('components.layout.toolbar.communicationdropdown.communication') }}</el-text><!-- 通讯 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="start">{{ $t('components.layout.toolbar.communicationdropdown.start') }}</el-dropdown-item><!-- 开始 -->
        <el-dropdown-item command="stop">{{ $t('components.layout.toolbar.communicationdropdown.stop') }}</el-dropdown-item><!-- 停止 -->
        <el-dropdown-item disabled>{{ $t('components.layout.toolbar.communicationdropdown.screen_calibration') }}</el-dropdown-item><!-- 屏幕校准 -->
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