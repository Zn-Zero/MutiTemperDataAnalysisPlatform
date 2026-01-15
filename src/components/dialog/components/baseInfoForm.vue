<script setup>
import { useInstrumentStore } from '@/stores/instrument'

const emit = defineEmits(['closeForm'])

const instrumentStore = useInstrumentStore()

const portList = instrumentStore.portList
const baudRateOpt = instrumentStore.baudRateOpt
const warningTypeOpt = instrumentStore.warningTypeOpt
const channelsOpt = instrumentStore.channelsOpt
const beginOpt = instrumentStore.beginOpt
const defaultInsConfig = instrumentStore.defaultInsConfig

// todo 默认值填充
const form = reactive({
  port:        defaultInsConfig.port,       // 仪器端口
  baudRate:    defaultInsConfig.baudRate,   // 波特率
  insType:     defaultInsConfig.insType,    // 仪器型号
  insName:     defaultInsConfig.insName,    // 仪器名称
  insAddress:  defaultInsConfig.insAddress, // 仪器地址
  channels:    defaultInsConfig.channels,   // 通道数
  interval:    defaultInsConfig.interval,   // 采样间隔
  duration:    defaultInsConfig.duration,   // 持续时间
  begin:       defaultInsConfig.begin,      // 起始通道
  warningType: defaultInsConfig.warningType // 报警类型
})

const onSubmit = () => {
  // todo 提交表单逻辑
  // todo 提交逻辑后,emit关闭表单事件
  emit('closeForm')
}

onMounted(() => {
  instrumentStore.updatePortList()
})
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="仪器端口">
          <el-select v-model="form.port" placeholder="请选择端口">
            <el-option
              v-for="item in portList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="波特率">
          <el-select v-model="form.baudRate" placeholder="请选择波特率">
            <el-option
              v-for="item in baudRateOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="仪器型号">
          <el-input v-model="form.insType" placeholder="请输入仪器型号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="仪器名称">
          <el-input v-model="form.insName" placeholder="请输入仪器名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="仪器地址">
          <el-input v-model="form.insAddress" placeholder="请输入仪器地址" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="通道数">
          <el-select v-model="form.channels" placeholder="请选择通道数">
            <el-option
              v-for="item in channelsOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="采集间隔">
          <el-input v-model="form.interval" type="number" placeholder="请输入采集间隔">
            <template #append>秒</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="持续时间">
          <el-input v-model="form.duration" type="number" placeholder="请输入持续时间">
            <template #append>小时</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="起始通道">
          <el-select v-model="form.begin" placeholder="请选择起始通道">
            <el-option
              v-for="item in beginOpt"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="告警声音">
          <el-select v-model="form.warningType" placeholder="请选择告警声音">
            <el-option
              v-for="item in warningTypeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存配置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>