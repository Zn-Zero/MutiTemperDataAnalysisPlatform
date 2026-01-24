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
    <el-text>欢迎使用多路温度数据分析平台</el-text>
    <el-text>{{ env.isPackaged ? '（已打包）' : '（开发模式）' }}</el-text>
    <div v-if="!env.isPackaged">
      <el-button type="primary" style="margin-left: 20px;" @click="$router.push('/demo/port')">端口测试</el-button>
      <el-button type="primary" style="margin-left: 20px;" @click="$router.push('/demo/file')">csv测试</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>