<script setup>
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import { createCRCData } from '@/utils/crc16'
import { convertToHexString, parseInputToByteArray } from '@/utils';

const router = useRouter()

const portData = ref('awaiting data...');
const msg = ref(null);

// 定义数据处理回调（可复用）
const handleSerialData = (data) => {
  console.log('收到串口数据：', data)
  portData.value = convertToHexString(data.raw)
}

// 定义错误处理回调
const handleSerialError = (msg) => {
  console.error('串口错误：', msg)
}

const sendMsg = _ => {
  parseInputToByteArray(msg.value).then((data) => {
    const msgForCRC = new Uint8Array(createCRCData(data))
    window.serialApi.write(msgForCRC).then((result) => {  
      ElMessage('message written: ' + result)
    }).catch((err) => { 
      ElMessage.error('Error on write: ' + err.message)
    })
  }).catch((err) => {
    ElMessage.error('输入数据格式错误：' + err.message)
  })
}

onMounted(() => {
  // 移除指定回调
  window.serialApi.offData(handleSerialData)
  window.serialApi.onData(handleSerialData)

  window.serialApi.offError(handleSerialError)
  window.serialApi.onError(handleSerialError)
});
</script>

<template>
  <div style="margin: 20px;">
    <h3>串口数据接收区：</h3>
    <el-card style="margin-top: 10px; min-height: 200px;">
      <pre>{{ portData }}</pre>
    </el-card>
  </div>

  <div style="margin: 20px;">
    <h3>串口数据发送区：</h3>
    <el-card style="margin-top: 10px; min-height: 200px;">
      <el-input type="textarea" 
                v-model="msg" 
                placeholder="请输入要发送的数据（十六进制，空格分隔）" 
                :rows="6" 
                style="width: 100%;">
      </el-input>
    </el-card>
  </div>
  <el-button type="primary" @click="sendMsg" >发送数据</el-button>
  <!-- [0x01, 0x03, 0x00, 0x00, 0x00, 0x01] -->

  <div style="position: fixed;bottom: 80px;right: 60px;">
    <el-button
      title="返回串口选择"
      type="primary" 
      :icon="Back" 
      circle 
      @click="router.push('/demo/port')" 
    />
  </div>
</template>

<style scoped>

</style>