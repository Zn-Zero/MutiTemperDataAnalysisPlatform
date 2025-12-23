import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePortStore = defineStore('port', () => {
  const port = ref(null)
  const portIns = ref(null)
  // const portData = reactive({})

  const portPath = computed(() => port ? port.path : null)

  const getOpenedPort = _ => {
    return { port, portIns }
  }

  const setOpenedPort = (new_port, new_portIns) => {
    port.value = new_port
    portIns.value = new_portIns
  }

  const removeOpenedPort = _ => {
    port.value = null
    portIns.value = null
  }

  return { portPath, getOpenedPort, setOpenedPort, removeOpenedPort }
})
