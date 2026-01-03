<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { useIpcRenderer } from '@vueuse/electron'

// const ipcRenderer = useIpcRenderer();
// ipcRenderer.send("window-new", "msg"); // 向主进程通信

</script>

<template>
  <div style="height: 100vh; width: 100vw; overflow: hidden;">
    <RouterView />
    <BackBtn />
  </div>
</template>

<style scoped></style>
