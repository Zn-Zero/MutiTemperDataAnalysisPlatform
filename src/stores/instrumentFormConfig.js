// src/store/instrumentFormConfig.js
import { defineStore } from 'pinia'
import { ElLoading, ElMessage } from 'element-plus'
import i18n from '@/locales'

const { t } = i18n.global

// 定义store，命名为useInstrumentFormConfigStore
export const useInstrumentFormConfigStore = defineStore('instrumentFormConfig', () => {

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
/*-----------------------↓表单Options↓------------------------------*/

  // 响应式状态：存放所有选项（对应原Opt数组）
  const portList = ref([])

  // todo 修改为从配置文件中获取波特率选项
  const baudRateOpt = [
    { label: '9600', value: '9600' },
    { label: '19200', value: '19200' },
    { label: '38400', value: '38400' },
    { label: '57600', value: '57600' },
    { label: '115200', value: '115200' }
  ]

  // todo 读取已连接设备的通道总数
  const channelAmountOpt = [8, 16, 24, 32, 40, 48, 56, 64].map((count) => ({
    label: t('stores.instrumentformconfig.channel_amount_label', { count }), // 原文：{count}路
    value: `${count}`
  }))

  // todo 全通道选项，根据已连接设备的通道总数动态生成，用于选择起始通道和批量修改选择通道
  const channelList = ref([])
  // todo 在确定设备通道总数后，先调用generateDefaultChannel方法生成默认通道。然后调用此方法即时生成channelList选项
  const getChannelList = () => {
    channelList.value.splice(0, channelList.value.length) // 清空列表
    // todo channelList每次调取时重新生成，label用channelID+channelName，value用channelID
    for (let i = 1; i <= 64; i++) {  
      channelList.value.push({ label: `CH${i}`, value: `CH${i}` })
    }

    return channelList
  }

  getChannelList()

  const warningTypeOpt = [
    { label: t('stores.instrumentformconfig.warning_sound1'), value: 'sound1' }, // 原文：蜂鸣音1
    { label: t('stores.instrumentformconfig.warning_sound2'), value: 'sound2' }, // 原文：蜂鸣音2
    { label: t('stores.instrumentformconfig.warning_voice'), value: 'sound3' } // 原文：语音告警
  ]

const sensorTypeOpt = [
  { value: 'J', label: 'J' },
  { value: 'K', label: 'K' },
  { value: 'T', label: 'T' },
  { value: 'E', label: 'E' },
  { value: 'N', label: 'N' },
  { value: 'S', label: 'S' },
  { value: 'R', label: 'R' },
  { value: 'B', label: 'B' },
  { value: 'PT100', label: 'PT100' }
]

const unitOpt = [
  { value: '℃', label: '℃' },
  { value: '°F', label: '°F' },
  { value: 'K', label: 'K' },
  { value: '°R', label: '°R' }
]

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

  // 添加新的波特率选项 保留但不使用，直接用可编辑下拉框可自行输入
  const addBaudRate = (newBaudRate) => {
    baudRateOpt.value.push(newBaudRate)
  }

/*-----------------------↑表单Options↑------------------------------*/

  // todo 默认仪器配置 生成时需要加入insId
  const defaultInsConfig = reactive({
    port: null,          // 仪器端口
    baudRate: null,      // 波特率
    insType: null,       // 仪器型号
    insName: null,       // 仪器名称
    insAddress: null,    // 仪器地址
    channelAmount: null, // 通道总数
    channels: null,      // 通道配置
    interval: null,      // 采样间隔
    duration: null,      // 持续时间
    begin: null,         // 起始通道
    warningType: null,   // 报警类型
    enabled: false       // 是否启用该仪器
  })

  // todo 在基础设置保存后，立即生成通道默认配置
  const generateDefaultChannel = (instrument) => {
    instrument.channels = []
    // for (let i = 0; i < instrument.channelAmount; i++) {
    for (let i = 0; i < 64; i++) {
      instrument.channels.push({
        insId: instrument.insId,                       // 所属仪器ID
        channelID: `CH${i + 1}`,                       // 通道ID
        channelName: t('stores.instrumentformconfig.channel_name', { index: i + 1 }), // 通道名称（原文：通道{index}）
        highLimit: 100,                                // 高限报警值
        lowLimit: -10,                                 // 低限报警值
        sensorType: 'K',                               // 传感器类型 [热电偶：J, K, T, E, N, S, R, B, 热电阻：PT100]
        sensorModel: null,                             // 传感器型号
        sensorSerial: null,                            // 传感器序列号
        max: '--.--',                                  // 最大值
        extremeMax: '--.--',                           // 极限最大值
        min: '--.--',                                  // 最小值
        extremeMin: '--.--',                           // 极限最小值
        average: '--.--',                              // 平均值
        current: '--.--',                              // 当前值
        unit: '℃',                                    // 单位 [℃, °F, K, °R]
        enabled: true,                                 // 是否启用该通道
        visible: true,                                 // 是否在图表中显示该通道
        alarmed: false,                                // 是否处于报警状态
        alarmHistory: [],                              // 报警历史记录
        color: defaultColors[i % defaultColors.length] // 在图表中的颜色
      })
    }
  }

  // todo 从配置文件中获取默认仪器配置
  const setDefaultInsConfig = (configFromFile) => {
    defaultInsConfig.port          = configFromFile.port          || ''
    defaultInsConfig.baudRate      = configFromFile.baudRate      || ''
    defaultInsConfig.insType       = configFromFile.insType       || ''
    defaultInsConfig.insName       = configFromFile.insName       || ''
    defaultInsConfig.insAddress    = configFromFile.insAddress    || ''
    defaultInsConfig.channelAmount = configFromFile.channelAmount || ''
    defaultInsConfig.interval      = configFromFile.interval      || ''
    defaultInsConfig.duration      = configFromFile.duration      || ''
    defaultInsConfig.begin         = configFromFile.begin         || ''
    defaultInsConfig.warningType   = configFromFile.warningType   || ''
  }

  return {
    defaultInsConfig,
    portList,
    baudRateOpt,
    channelAmountOpt,
    channelList,
    warningTypeOpt,
    sensorTypeOpt,
    unitOpt,
    getChannelList,
    generateDefaultChannel,
    updatePortList,
    addBaudRate,
    setDefaultInsConfig
  }
})