// src/store/instrumentStore.js
import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

// 定义store，命名为useInstrumentStore
export const useInstrumentStore = defineStore('instrument', () => {

  // 预定义颜色列表
  const defaultColors = [
    '#E41A1C', '#377EB8', '#4DAF4A', '#FF7F00', '#984EA3', '#FFFF33', '#A65628', '#F781BF',
    '#999999', '#66C2A5', '#FC8D62', '#8DA0CB', '#E78AC3', '#A6D854', '#FFD92F', '#B3B3B3',
    '#D62728', '#1F77B4', '#2CA02C', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF',
    '#9467BD', '#8C7853', '#C49C94', '#F7B6D2', '#C7C7C7', '#DBDB8D', '#9EDAE5', '#AD494A',
    '#8C6D31', '#CE6DBD', '#DE9ED6', '#DADAEB', '#6B6ECF', '#E5C494', '#FDD0A2', '#FDDBA2',
    '#BADEA6', '#66C4A0', '#4FB1BA', '#5DADE2', '#85C1E9', '#F1948A', '#EC7063', '#AF7AC5',
    '#BB8FCE', '#F4D03F', '#EB984E', '#58D68D', '#45B39D', '#A3E4D7', '#AED6F1', '#D7BDE2',
    '#F5B7B1', '#FAD7A0', '#ABEBC6', '#F8C471', '#E6B0AA', '#D5F5E3', '#D6616B', '#7B92A8'
  ]

  // 响应式状态：存放所有选项（对应原Opt数组）
  const portList = ref([])

  // todo 修改为从配置文件中获取波特率选项
  const baudRateOpt = ref([
    { label: '9600', value: '9600' },
    { label: '19200', value: '19200' },
    { label: '38400', value: '38400' },
    { label: '57600', value: '57600' },
    { label: '115200', value: '115200' }
  ])

  // todo 读取已连接设备的通道数
  const channelsOpt = ref([
    { label: '8路', value: '8' },
    { label: '16路', value: '16' },
    { label: '24路', value: '24' },
    { label: '32路', value: '32' },
    { label: '40路', value: '40' },
    { label: '48路', value: '48' },
    { label: '56路', value: '56' },
    { label: '64路', value: '64' }
  ])

  // todo 起始通道选项，根据已连接设备的通道数动态生成
  const beginOpt = ref([])
  for (let i = 1; i <= 64; i++) {  
    beginOpt.value.push(`${i}`)
  }

  const warningTypeOpt = ref([
    { label: '蜂鸣音1', value: 'sound1' },
    { label: '蜂鸣音2', value: 'sound2' },
    { label: '语音告警', value: 'sound3' }
  ])

  const defaultInsConfig = reactive({
    port: null,       // 仪器端口
    baudRate: null,   // 波特率
    insType: null,    // 仪器型号
    insName: null,    // 仪器名称
    insAddress: null, // 仪器地址
    channels: null,   // 通道数
    interval: null,   // 采样间隔
    duration: null,   // 持续时间
    begin: null,      // 起始通道
    warningType: null // 报警类型
  })

  // todo 根据通道数，动态生成匹配通道数量的配置项
  const channelConfig = ref([])

  // todo 在基础设置保存后，立即生成通道默认配置
  const generateDefaultChannelConfig = (config) => {
    channelConfig.splice(0, channelConfig.length)
    for (let i = 0; i < config.channels; i++) {
      channelConfig.push({
        channelID: i + 1,
        channelName: `通道${i + 1}`,
        highLimit: null,
        lowLimit: null,
        ave: null,
        unit: '',
        enabled: true,
        color: defaultColors[i % defaultColors.length]
      })
    }
  }

  const setChannelConfig = (config) => {
    channelConfig.splice(0, channelConfig.length)
    channelConfig.push(...config)
  }

  // todo 动态获取系统可用端口列表
  const updatePortList = () => {
  // const updatePortList = async () => {
    portList.value.push('COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9')

    // const loading = ElLoading.service({ fullscreen: true, text: '正在扫描串口...' })
    // portList.splice(0, portList.length)  // 清空列表
    // const ports = await window.serialApi.list()
    // portList.push(...ports)
    // loading.close()
  }

  const addBaudRate = (newBaudRate) => {
    baudRateOpt.value.push(newBaudRate)
  }

  // todo 从配置文件中获取默认仪器配置
  const setDefaultInsConfig = (config) => {
    defaultInsConfig.port        = config.port        || ''
    defaultInsConfig.baudRate    = config.baudRate    || ''
    defaultInsConfig.insType     = config.insType     || ''
    defaultInsConfig.insName     = config.insName     || ''
    defaultInsConfig.insAddress  = config.insAddress  || ''
    defaultInsConfig.channels    = config.channels    || ''
    defaultInsConfig.interval    = config.interval    || ''
    defaultInsConfig.duration    = config.duration    || ''
    defaultInsConfig.begin       = config.begin       || ''
    defaultInsConfig.warningType = config.warningType || ''
  }

  const persistData = async (data, filePath) => {
    await window.fileApi.saveData(data, filePath)
  }

  return {
    defaultInsConfig,
    portList,
    baudRateOpt,
    channelsOpt,
    beginOpt,
    warningTypeOpt,
    generateDefaultChannelConfig,
    setChannelConfig,
    updatePortList,
    addBaudRate,
    setDefaultInsConfig
  }
})