<script setup>
import { useInstrumentFormConfigStore } from '@/stores/instrumentFormConfig'

const instrumentFormConfigStore = useInstrumentFormConfigStore()

const dialogVisibleModel = defineModel({
  type: Boolean,
  required: true
})

const { title, channel } = defineProps({
  title: {
    type: String,
    default: '通道设置'
  },
  channel: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save'])

const sensorTypeOptions = instrumentFormConfigStore.sensorTypeOpt

const unitOptions = instrumentFormConfigStore.unitOpt

const formModel = reactive({
  insId: '',
  channelID: '',
  channelName: '',
  highLimit: null,
  lowLimit: null,
  sensorType: '',
  sensorModel: '',
  sensorSerial: '',
  max: null,
  extremeMax: null,
  min: null,
  extremeMin: null,
  average: null,
  current: null,
  unit: '',
  enabled: true,
  visible: true,
  alarmed: false,
  alarmHistory: '',
  color: ''
})

watch(() => channel, (value) => {
  const source = value || {}
  Object.assign(formModel, source)
}, { immediate: true })

const handleClose = (done) => {
  dialogVisibleModel.value = false
  done()
}

const handleCancel = () => {
  dialogVisibleModel.value = false
}

const handleSave = () => {
  emit('save', { ...formModel })
  dialogVisibleModel.value = false
}

/*
{
  insId --------> 所属仪器ID
  channelID ----> 通道ID
  channelName --> 通道名称
  highLimit ----> 高限报警值
  lowLimit -----> 低限报警值
  sensorType ---> 传感器类型 [热电偶：J, K, T, E, N, S, R, B, 热电阻：PT100]
  sensorModel --> 传感器型号
  sensorSerial -> 传感器序列号
  max ----------> 最大值
  extremeMax ---> 极限最大值
  min ----------> 最小值
  extremeMin ---> 极限最小值
  average ------> 平均值
  current ------> 当前值
  unit ---------> 单位 [℃, °F, K, °R]
  enabled ------> 是否启用该通道
  visible ------> 是否在图表中显示该通道
  alarmed ------> 是否处于报警状态
  alarmHistory -> 报警历史记录
  color --------> 在图表中的颜色
}
*/
</script>

<template>
  <el-dialog
    v-model="dialogVisibleModel"
    width="700"
    :title="title"
    :before-close="handleClose"
  >
    <el-form label-width="110px" label-position="right">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="通道名称">
            <el-input v-model="formModel.channelName" placeholder="请输入通道名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="传感器类型">
            <el-select v-model="formModel.sensorType" placeholder="选择类型" style="width: 100%">
              <el-option v-for="item in sensorTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传感器型号">
            <el-input v-model="formModel.sensorModel" placeholder="请输入型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传感器序列号">
            <el-input v-model="formModel.sensorSerial" placeholder="请输入序列号" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="单位">
            <el-select v-model="formModel.unit" placeholder="选择单位" style="width: 100%">
              <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="高限报警值">
            <el-input-number v-model="formModel.highLimit" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="低限报警值">
            <el-input-number v-model="formModel.lowLimit" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="极限最大值">
            <el-input-number v-model="formModel.extremeMax" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="极限最小值">
            <el-input-number v-model="formModel.extremeMin" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="颜色">
            <el-color-picker v-model="formModel.color" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="8">
          <el-form-item label="启用">
            <el-switch v-model="formModel.enabled" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可见">
            <el-switch v-model="formModel.visible" />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="报警历史">
            <el-input v-model="formModel.alarmHistory" type="textarea" :rows="2" placeholder="无" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>