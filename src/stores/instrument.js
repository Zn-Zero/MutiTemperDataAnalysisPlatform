// src/store/instrument.js
import { defineStore } from 'pinia'
import { ElLoading, ElMessage } from 'element-plus'
import { useInstrumentFormConfigStore } from './instrumentFormConfig'

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
      ElMessage.error(`未找到仪器: ${insName}`)
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
      ElMessage.error(`未找到仪器: ${insName}`)
      return false
    }
    return true
  }

  // 设置通道配置
  const UpdateChannel = (insName, channelId, config) => {
    const instrument = instrumentList.find(ins => ins.insName === insName)
    if (!instrument) {
      ElMessage.error(`未找到仪器: ${insName}`)
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
        ElMessage.error(`未找到通道: ${channelId} 在仪器: ${insName} 中`)
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
      ElMessage.error('保存数据时出错:', error)
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
      ElMessage.error('加载数据时出错:', error)
      return false
    }
  }

  const setTestData = () => {
    Object.assign(currentInstrument, {
      port: 'COM3',             // 仪器端口
      baudRate: 19200,          // 波特率
      insType: '7064',          // 仪器型号
      insName: '多路温度测试仪_cur', // 仪器名称
      insAddress: null,         // 仪器地址
      channelAmount: 64,      // 通道总数
      channels: [],             // 通道配置
      interval: 1000,           // 采样间隔ms
      duration: 1,              // 持续时间h
      begin: 'CH1',             // 起始通道
      warningType: 1            // 报警类型
    })

    // 添加到仪器列表，同时生成一些简单的临时数据
    instrumentList.push(currentInstrument, {
      port: 'COM4',             // 仪器端口
      baudRate: 19200,          // 波特率
      insType: '7032',          // 仪器型号
      insName: '多路温度测试仪1', // 仪器名称
      insAddress: null,         // 仪器地址
      channelAmount: 32,      // 通道总数
      channels: [],             // 通道配置
      interval: 1000,           // 采样间隔ms
      duration: 1,              // 持续时间h
      begin: 'CH9',             // 起始通道
      warningType: 1            // 报警类型
    },{
      port: 'COM5',             // 仪器端口
      baudRate: 19200,          // 波特率
      insType: '7008',          // 仪器型号
      insName: '多路温度测试仪2', // 仪器名称
      insAddress: null,         // 仪器地址
      channelAmount: 8,         // 通道总数
      channels: [],             // 通道配置
      interval: 1000,           // 采样间隔ms
      duration: 1,              // 持续时间h
      begin: 'CH3',             // 起始通道
      warningType: 1            // 报警类型
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