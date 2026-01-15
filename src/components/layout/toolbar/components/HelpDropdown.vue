<script setup>
import { ElMessageBox } from 'element-plus'
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
  ElMessageBox.alert('二维码功能开发中', '帮助', {
    confirmButtonText: '确定'
  })
}

// 显示关于
const handleAbout = () => {
  ElMessageBox.alert('关于功能开发中', '帮助', {
    confirmButtonText: '确定'
  })
}

</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-text class="menu-text">帮助</el-text>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="qr">二维码</el-dropdown-item>
        <el-dropdown-item command="about">关于</el-dropdown-item>
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