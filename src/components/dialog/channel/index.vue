<script setup>
import { useInstrumentFormConfigStore } from '@/stores/instrumentFormConfig'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const instrumentFormConfigStore = useInstrumentFormConfigStore()

const dialogVisibleModel = defineModel({
  type: Boolean,
  required: true
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  channel: {
    type: Object,
    default: () => ({})
  }
})

const dialogTitle = computed(() => props.title || t('components.dialog.channel.title')) // 原文：通道设置

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
    :title="dialogTitle"
    :before-close="handleClose"
  >
    <el-form label-width="110px" label-position="right">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item :label="$t('components.dialog.channel.channel_name')"> <!-- 原文：通道名称 -->
            <el-input v-model="formModel.channelName" :placeholder="$t('components.dialog.channel.channel_name_placeholder')" /> <!-- 原文：请输入通道名称 -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.sensor_type')"> <!-- 原文：传感器类型 -->
            <el-select v-model="formModel.sensorType" :placeholder="$t('components.dialog.channel.sensor_type_placeholder')" style="width: 100%"> <!-- 原文：选择类型 -->
              <el-option v-for="item in sensorTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.sensor_model')"> <!-- 原文：传感器型号 -->
            <el-input v-model="formModel.sensorModel" :placeholder="$t('components.dialog.channel.sensor_model_placeholder')" /> <!-- 原文：请输入型号 -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.sensor_serial')"> <!-- 原文：传感器序列号 -->
            <el-input v-model="formModel.sensorSerial" :placeholder="$t('components.dialog.channel.sensor_serial_placeholder')" /> <!-- 原文：请输入序列号 -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.unit')"> <!-- 原文：单位 -->
            <el-select v-model="formModel.unit" :placeholder="$t('components.dialog.channel.unit_placeholder')" style="width: 100%"> <!-- 原文：选择单位 -->
              <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.high_limit')"> <!-- 原文：高限报警值 -->
            <el-input-number v-model="formModel.highLimit" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.low_limit')"> <!-- 原文：低限报警值 -->
            <el-input-number v-model="formModel.lowLimit" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.extreme_max')"> <!-- 原文：极限最大值 -->
            <el-input-number v-model="formModel.extremeMax" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.extreme_min')"> <!-- 原文：极限最小值 -->
            <el-input-number v-model="formModel.extremeMin" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.color')"> <!-- 原文：颜色 -->
            <el-color-picker v-model="formModel.color" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="8">
          <el-form-item :label="$t('components.dialog.channel.enabled')"> <!-- 原文：启用 -->
            <el-switch v-model="formModel.enabled" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('components.dialog.channel.visible')"> <!-- 原文：可见 -->
            <el-switch v-model="formModel.visible" />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('components.dialog.channel.alarm_history')"> <!-- 原文：报警历史 -->
            <el-input v-model="formModel.alarmHistory" type="textarea" :rows="2" :placeholder="$t('components.dialog.channel.alarm_history_placeholder')" /> <!-- 原文：无 -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="handleCancel">{{ $t('components.dialog.channel.cancel') }}</el-button> <!-- 原文：取消 -->
      <el-button type="primary" @click="handleSave">{{ $t('components.dialog.channel.save') }}</el-button> <!-- 原文：保存 -->
    </template>
  </el-dialog>
</template>

<style scoped>

</style>