<script setup>
const env = reactive({
  isPackaged: true
})

const getSysInfo = async () => {
  const sysInfo = await window.osApi.env()
  Object.assign(env, sysInfo)
}

onMounted(() => {
  getSysInfo()
})
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
    <el-text>{{ $t('view.homeview.welcome') }}</el-text> <!-- 原文：欢迎使用多路温度数据分析平台 -->
    <el-text>{{ env.isPackaged ? $t('view.homeview.packaged') : $t('view.homeview.dev') }}</el-text> <!-- 原文：（已打包）/（开发模式） -->
    <div v-if="!env.isPackaged">
      <el-button type="primary" style="margin-left: 20px;" @click="$router.push('/demo/port')">{{ $t('view.homeview.port_test') }}</el-button> <!-- 原文：端口测试 -->
      <el-button type="primary" style="margin-left: 20px;" @click="$router.push('/demo/file')">{{ $t('view.homeview.csv_test') }}</el-button> <!-- 原文：csv测试 -->
    </div>
  </div>
</template>

<style scoped>

</style>