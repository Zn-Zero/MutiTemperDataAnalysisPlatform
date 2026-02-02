<script setup>
import { ElMessageBox } from 'element-plus'
import LanguageDialog from '@/components/dialog/language/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const langDialogVisible = ref(false) // 是否显示语言设置选项

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'print':
      handlePrint()
      break
    case 'language':
      handleLanguage()
      break
  }
}

// 打印设置
const handlePrint = () => {
  ElMessageBox.alert(t('components.layout.toolbar.settingsdropdown.print_feature_in_development'), t('components.layout.toolbar.settingsdropdown.settings'), { // 打印设置功能开发中  // 设置
    confirmButtonText: t('components.layout.toolbar.settingsdropdown.confirm') // 确定
  })
}

// 设置语言
const handleLanguage = () => {
  langDialogVisible.value = true
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">{{ $t('components.layout.toolbar.settingsdropdown.settings') }}</el-text><!-- 设置 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="print">{{ $t('components.layout.toolbar.settingsdropdown.print_settings') }}</el-dropdown-item><!-- 打印设置 -->
        <el-dropdown-item command="language">{{ $t('components.layout.toolbar.settingsdropdown.set_language') }}</el-dropdown-item><!-- 设置语言 -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <LanguageDialog v-model="langDialogVisible" />
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