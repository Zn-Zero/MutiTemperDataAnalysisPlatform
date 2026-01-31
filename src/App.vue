<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useInstrumentStore } from './stores/instrument'
// import { useI18n } from 'vue-i18n'
// const { locale, messages } = useI18n()
// import { useIpcRenderer } from '@vueuse/electron'

// const ipcRenderer = useIpcRenderer();
// ipcRenderer.send("window-new", "msg"); // 向主进程通信

const instrumentStore = useInstrumentStore()
onMounted(() => {
  instrumentStore.setTestData()

  console.log(window.osApi.env())
})

</script>

<template>
  <div style="height: 100vh; width: 100vw; overflow: hidden;">
    <!-- <el-config-provider :locale="messages[locale]"> -->
    <RouterView />
    <!-- <BackBtn /> -->
    <!-- </el-config-provider> -->
  </div>
</template>

<style scoped></style>
