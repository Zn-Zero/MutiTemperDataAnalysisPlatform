import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePortStore = defineStore('port', () => {
  const port = ref(null)
  const portConfig = ref(null)
  // const portData = reactive({})

  const portPath = computed(() => port ? port.path : null)

  const getOpenedPort = _ => {
    return { port, portConfig }
  }

  const setOpenedPort = (new_port, new_portConfig) => {
    port.value = new_port
    portConfig.value = new_portConfig
  }

  const removeOpenedPort = _ => {
    port.value = null
    portConfig.value = null
  }

  return { portPath, getOpenedPort, setOpenedPort, removeOpenedPort }
})
