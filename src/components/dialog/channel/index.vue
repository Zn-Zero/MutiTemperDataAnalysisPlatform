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

watch(() => props.channel, (value) => {
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
    <el-scrollbar height="60vh" wrap-style="padding-right: 10px;">
      <el-form label-width="110px" label-position="right">
        
        <!-- 原文：通道设置 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.channel_settings')}}</el-divider>
      
        <el-row :gutter="16">
          <el-col :span="24">
            <!-- 原文：通道名称 -->
            <el-form-item :label="$t('components.dialog.channel.channel_name')">
              <!-- 原文：请输入通道名称 -->
              <el-input v-model="formModel.channelName" :placeholder="$t('components.dialog.channel.channel_name_placeholder')" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="8">
            <!-- 原文：颜色 -->
            <el-form-item :label="$t('components.dialog.channel.color')">
              <el-color-picker v-model="formModel.color" />
            </el-form-item>
          </el-col>
          
          <el-col :span="8" style="display: flex;justify-content: center;">
            <el-form-item label-width="0px">
              <!-- 原文：启用 -->
              <!-- 原文：禁用 -->
              <el-switch
                v-model="formModel.enabled"
                :active-text="$t('components.dialog.channel.enabled')"
                :inactive-text="$t('components.dialog.channel.disabled')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display: flex;justify-content: center;">
            <el-form-item label-width="0px">
              <!-- 原文：可见 -->
              <!-- 原文：隐藏 -->
              <el-switch
                v-model="formModel.visible"
                :active-text="$t('components.dialog.channel.visible')"
                :inactive-text="$t('components.dialog.channel.hidden')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：单位 -->
            <el-form-item :label="$t('components.dialog.channel.unit')">
              <!-- 原文：选择单位 -->
              <el-select
                v-model="formModel.unit"
                :placeholder="$t('components.dialog.channel.unit_placeholder')"
                style="width: 100%"
              >
                <el-option
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 原文：温度设置 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.temperature_settings')}}</el-divider>
      
        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：高限报警值 -->
            <el-form-item :label="$t('components.dialog.channel.high_limit')">
              <el-input
                v-model="formModel.highLimit"
                type="number"
                :controls="false"
                style="width: 100%"
                >
                <!-- todo 切换温度单位时自动换算 -->
                <template #append>{{ formModel.unit }}</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：低限报警值 -->
            <el-form-item :label="$t('components.dialog.channel.low_limit')">
              <el-input
                v-model="formModel.lowLimit"
                type="number"
                :controls="false"
                style="width: 100%"
                >
                <!-- todo 切换温度单位时自动换算 -->
                <template #append>{{ formModel.unit }}</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：极限最大值 -->
            <el-form-item :label="$t('components.dialog.channel.extreme_max')">
              <el-input
                v-model="formModel.extremeMax"
                type="number"
                :controls="false"
                style="width: 100%"
              >
                <template #append>{{ formModel.unit }}</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：极限最小值 -->
            <el-form-item :label="$t('components.dialog.channel.extreme_min')">
              <el-input
                v-model="formModel.extremeMin"
                type="number"
                :controls="false"
                style="width: 100%"
              >
                <template #append>{{ formModel.unit }}</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 原文：传感器 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.sensor_settings')}}</el-divider>
      
        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：传感器类型 -->
            <el-form-item :label="$t('components.dialog.channel.sensor_type')">
              <!-- 原文：选择类型 -->
              <el-select
                v-model="formModel.sensorType"
                :placeholder="$t('components.dialog.channel.sensor_type_placeholder')"
                style="width: 100%"
              >
                <el-option
                  v-for="item in sensorTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：传感器型号 -->
            <el-form-item :label="$t('components.dialog.channel.sensor_model')">
              <!-- 原文：请输入型号 -->
              <el-input v-model="formModel.sensorModel" :placeholder="$t('components.dialog.channel.sensor_model_placeholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：传感器序列号 -->
            <el-form-item :label="$t('components.dialog.channel.sensor_serial')">
              <!-- 原文：请输入序列号 -->
              <el-input v-model="formModel.sensorSerial" :placeholder="$t('components.dialog.channel.sensor_serial_placeholder')" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 原文：报警历史 -->
        <el-divider content-position="left">{{ $t('components.dialog.channel.alarm_history') }}</el-divider>
        
        <el-row :gutter="16">
          <el-col :span="24">
            <!-- todo 报警历史表 -->
            <!-- <el-form-item :label="$t('components.dialog.channel.alarm_history')"> -->
              <!-- 原文：无 -->
              <!-- <el-input v-model="formModel.alarmHistory" type="textarea" :rows="2" :placeholder="$t('components.dialog.channel.alarm_history_placeholder')" /> -->
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <!-- 原文：取消 -->
      <el-button @click="handleCancel">{{ $t('components.dialog.channel.cancel') }}</el-button>
      <!-- 原文：保存 -->
      <el-button type="primary" @click="handleSave">{{ $t('components.dialog.channel.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>