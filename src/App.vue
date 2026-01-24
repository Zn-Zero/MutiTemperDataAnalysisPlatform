<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useInstrumentStore } from './stores/instrument'
// import { useIpcRenderer } from '@vueuse/electron'

// const ipcRenderer = useIpcRenderer();
// ipcRenderer.send("window-new", "msg"); // 向主进程通信

const instrumentStore = useInstrumentStore()
onMounted(() => {
  instrumentStore.setTestData()
})

</script>

<template>
  <div style="height: 100vh; width: 100vw; overflow: hidden;">
    <RouterView />
    <!-- <BackBtn /> -->
  </div>
</template>

<style scoped></style>
