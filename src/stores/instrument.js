// src/store/instrument.js
import { defineStore } from 'pinia'
import { ElLoading, ElMessage } from 'element-plus'
import { useInstrumentFormConfigStore } from './instrumentFormConfig'
import i18n from '@/locales'

const { t } = i18n.global
// 定义store，命名为useInstrumentStore
export const useInstrumentStore = defineStore('instrument', () => {

  const { generateDefaultChannel } = useInstrumentFormConfigStore() // 引入仪器表单配置Store

  // 仪器列表
  const instrumentList = reactive([])

  // 当前建立连接的仪器
  const currentInstrument = reactive({})

  /*{
    port: null,          // 仪器端口
    baudRate: null,      // 波特率
    insType: null,       // 仪器型号
    insName: null,       // 仪器名称
    insAddress: null,    // 仪器地址
    channelAmount: null, // 通道总数
    channels: null,      // 通道配置
    interval: null,      // 采样间隔ms
    duration: null,      // 持续时间ms
    begin: null,         // 起始通道
    warningType: null    // 报警类型
  }*/

  // 设置当前仪器
  const setCurrentInstrument = (insName) => {
    const instrument = instrumentList.find(ins => ins.insName === insName)
    if (instrument) {
      Object.assign(currentInstrument, instrument)
      return true
    } else {
      ElMessage.error(t('stores.instrument.not_found_instrument', { insName })) // 原文：未找到仪器: {insName}
      return false
    }
  }

  // 清空当前仪器
  const clearCurrentInstrument = () => {
    Object.keys(currentInstrument).forEach(key => {
      delete currentInstrument[key]
    })
  }

  // 更新仪器配置
  const UpdateInstrument = (insName, config) => {
    const instrumentIndex = instrumentList.findIndex(ins => ins.insName === insName)
    if (instrumentIndex !== -1) {
      instrumentList[instrumentIndex] = { ...instrumentList[instrumentIndex], ...config }
    } else {
      ElMessage.error(t('stores.instrument.not_found_instrument', { insName })) // 原文：未找到仪器: {insName}
      return false
    }
    return true
  }

  // 设置通道配置
  const UpdateChannel = (insName, channelId, config) => {
    const instrument = instrumentList.find(ins => ins.insName === insName)
    if (!instrument) {
      ElMessage.error(t('stores.instrument.not_found_instrument', { insName })) // 原文：未找到仪器: {insName}
      return false
    }
    
    if (!instrument.channels) {
      instrument.channels = []
      instrument.channels.push(...config)
    }else {
      const channelIndex = instrument.channels.findIndex(ch => ch.channelId === channelId)
      if (channelIndex !== -1) {
        instrument.channels[channelIndex] = { ...instrument.channels[channelIndex], ...config }
      } else {
        ElMessage.error(t('stores.instrument.not_found_channel', { channelId, insName })) // 原文：未找到通道: {channelId} 在仪器: {insName} 中
        return false
      }
    }
    return true
  }

  // 持久化仪器数据到本地文件
  const persistInstrument = async () => {
    try {
      // todo 根据实际情况修改文件名
      await window.fileApi.saveData(JSON.stringify(instrumentList), 'instrument.json')
      return true
    } catch (error) {
      ElMessage.error(t('stores.instrument.save_error')) // 原文：保存数据时出错
      return false
    }
  }

  // 从本地文件加载仪器数据
  const loadInstruments = async () => {
    try {
      // todo 根据实际情况修改文件名
      const jsonStr = await window.fileApi.loadData('instrument.json')
      if (jsonStr) {
        const data = JSON.parse(jsonStr)
        instrumentList.value = data
      }
      return true
    } catch (error) {
      ElMessage.error(t('stores.instrument.load_error')) // 原文：加载数据时出错
      return false
    }
  }

  const setTestData = () => {
    Object.assign(currentInstrument, {
      insId: 1,
      port: 'COM3',
      baudRate: 19200,
      insType: '7064',
      insName: t('stores.instrument.test_name_current'), // 原文：多路温度测试仪_cur
      insAddress: null,
      channelAmount: 64,
      channels: [],
      interval: 1000,
      duration: 1,
      begin: 'CH1',
      warningType: 1,
      enabled: true
    })

    // 添加到仪器列表，同时生成一些简单的临时数据
    instrumentList.push(currentInstrument, {
      insId: 2,
      port: 'COM4',
      baudRate: 19200,
      insType: '7032',
      insName: t('stores.instrument.test_name_1'), // 原文：多路温度测试仪1
      insAddress: null,
      channelAmount: 32,
      channels: [],
      interval: 1000,
      duration: 1,
      begin: 'CH9',
      warningType: 1,
      enabled: false
    },{
      insId: 3,
      port: 'COM5',
      baudRate: 19200,
      insType: '7008',
      insName: t('stores.instrument.test_name_2'), // 原文：多路温度测试仪2
      insAddress: null,
      channelAmount: 8,
      channels: [],
      interval: 1000,
      duration: 1,
      begin: 'CH3',
      warningType: 1,
      enabled: false
    })

    instrumentList.forEach(ins => {
      generateDefaultChannel(ins)
    })
    
  }  

  return {
    instrumentList,
    currentInstrument,
    setCurrentInstrument,
    clearCurrentInstrument,
    UpdateInstrument,
    UpdateChannel,
    persistInstrument,
    loadInstruments,
    setTestData
  }
})