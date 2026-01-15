<script setup>
import { ElMessageBox } from 'element-plus'
const showLangOpt = ref(false) // 是否显示语言设置选项

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
  ElMessageBox.alert('打印设置功能开发中', '设置', {
    confirmButtonText: '确定'
  })
}

// 设置语言
const handleLanguage = () => {
  ElMessageBox.alert('设置语言功能开发中', '设置', {
    confirmButtonText: '确定'
  })
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">设置</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="print">打印设置</el-dropdown-item>
        <el-dropdown-item command="language">设置语言</el-dropdown-item>
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