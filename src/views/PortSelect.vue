<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const init = ref(true)
const portList = reactive([])

const baudRate = ref(19200)   // 波特率（关键配置）[300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]
const dataBits = ref(8)       // 数据位（常见8位）[5, 6, 7, 8]
const stopBits = ref(1)       // 停止位（常见1位）[1, 1.5, 2]
const parity = ref('even')    // 偶校验（关键配置）['none', 'even', 'odd', 'mark', 'space']

const BaudOpt = [
  { value: 300, label: '300' }, // 特殊低速场景（如长期待机的低功耗测温节点）
  { value: 1200, label: '1200' }, // 极端环境（高温车间/强电磁干扰）、低功耗设备
  { value: 2400, label: '2400' }, // 超远距离传输（>100米）、老旧工业设备兼容
  { value: 4800, label: '4800' }, // 长距离传输（>50米）、恶劣电磁环境
  { value: 9600, label: '9600' }, // Modbus RTU 默认波特率（工业主流）、多路测温设备通信
  { value: 19200, label: '19200' }, // 中高速传输（16/32路温度采集器实时上传）
  { value: 38400, label: '38400' }, // 高速数据传输（多路采集器批量导出历史测温数据）
  { value: 57600, label: '57600' }, // 短距离高速通信（采集器与本地触摸屏通信）
  { value: 115200, label: '115200' } // 实验室环境/设备调试（STM32开发板与PC通信）
]

const initPorts = async () => {
  const ports = await window.serialApi.list()
  init.value = false
  portList.push(...ports)
}

onMounted(async () => {
  await initPorts()
})

const choosePort = (port) => {
  try {
    window.serialApi.open({
      path: port.path,
      baudRate: baudRate.value,
      dataBits: dataBits.value,
      stopBits: stopBits.value,
      parity: parity.value
    }).then(res => {
      ElMessage({type: 'success', message: '端口打开成功！'})

      port.isOpen = true

      router.push('/readPort')
    }).catch((err) => {
      ElMessage.error('端口操作失败：' + err.message)
    });
  } catch (err) {
    ElMessage.error('操作异常：' + err.message)
  }
}

const closePort = (port) => {
  window.serialApi.close().then(() => {
    ElMessage({type: 'success', message: '端口已关闭！'})
    port.isOpen = false

    // 移除回调
    window.serialApi.offData(handleSerialData)
    window.serialApi.offError(handleSerialError)
  }).catch((err) => {
    ElMessage.error('端口关闭失败：' + err.message)
  });
}
</script>

<template>
  <div v-if="init">扫描中</div>

  <ul v-else-if="portList.length > 0" style="padding: 0;overflow: auto;max-height: 100%;">
    <li v-for="port in portList" style="list-style: none;">
      <el-card style="width: 100%; margin-bottom: 10px; cursor: pointer;">
        <div style="display: flex;justify-content: space-between;">
          <span>{{ port.path }}</span>
          <div style="display: flex; align-items: center; gap: 10px;">
            <label>选择波特率：</label>
            <el-select v-model="baudRate" placeholder="Select" style="width: 240px">
              <el-option
                v-for="item in BaudOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button v-if="!port.isOpen" type="primary" @click="choosePort(port)">连接</el-button>
          <el-button v-else  @click="closePort(port)">断开连接</el-button>
        </div>
      </el-card>
    </li>
  </ul>
  
  <div v-else>
    <span>初始化完毕，暂无可识别串口</span>
    <el-button type="primary" @click="initPorts">重新扫描</el-button>
  </div>
</template>
  

  