<script setup>
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'qr':
      handleQr()
      break
    case 'about':
      handleAbout()
      break
  }
}

// 显示二维码
const handleQr = () => {
  ElMessageBox.alert(t('components.layout.toolbar.helpdropdown.qr_feature_in_development'), t('components.layout.toolbar.helpdropdown.help'), { // 二维码功能开发中  // 帮助
    confirmButtonText: t('components.layout.toolbar.helpdropdown.confirm') // 确定
  })
}

// 显示关于
const handleAbout = () => {
  ElMessageBox.alert(t('components.layout.toolbar.helpdropdown.about_feature_in_development'), t('components.layout.toolbar.helpdropdown.help'), { // 关于功能开发中  // 帮助
    confirmButtonText: t('components.layout.toolbar.helpdropdown.confirm') // 确定
  })
}

</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">{{ $t('components.layout.toolbar.helpdropdown.help') }}</el-text><!-- 帮助 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="qr">{{ $t('components.layout.toolbar.helpdropdown.qr_code') }}</el-dropdown-item><!-- 二维码 -->
        <el-dropdown-item command="about">{{ $t('components.layout.toolbar.helpdropdown.about') }}</el-dropdown-item><!-- 关于 -->
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