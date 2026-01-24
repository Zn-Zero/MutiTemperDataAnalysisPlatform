<script setup>
  import { useRouter } from 'vue-router'
  import { House } from '@element-plus/icons-vue'

  const router = useRouter()
  // const showBtn = ref(false)

  const backToMenu = () => {
    router.push('/')
  }
</script>

<template>
  <div v-if="router.currentRoute.value.fullPath !== '/home'" class="fixed">
    <!-- <ElButton type="primary" :icon="Menu" circle @click="router.push('/')" /> -->
    <ElButton
      title="返回菜单"
      type="primary" 
      :icon="House" 
      circle 
      @click="backToMenu" 
    />
  </div>
</template>

<style scoped>
  .fixed {
    position: fixed;
    bottom: 40px;
    right: 60px;
    z-index: 1000;
  }
</style>