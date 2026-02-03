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
  }
})

const dialogTitle = computed(() => props.title || t('components.dialog.channel.batch.title')) // 原文：通道设置

const emit = defineEmits(['save'])



const sensorTypeOptions = instrumentFormConfigStore.sensorTypeOpt

const unitOptions = instrumentFormConfigStore.unitOpt

const channelList = instrumentFormConfigStore.getChannelList()

const selectedChannels = ref([])

const formModel = reactive({
  sensorType: '',
  sensorModel: '',
  sensorSerial: '',
  unit: '',
  highLimit: null,
  lowLimit: null,
  extremeMax: null,
  extremeMin: null,
  enabled: true,
  visible: true,
  color: ''
})

const handleCancel = () => {
  dialogVisibleModel.value = false
}

const handleSave = () => {
  emit('save', { ...formModel })
  dialogVisibleModel.value = false
}

const handleClose = (done) => {
  dialogVisibleModel.value = false
  done()
}
</script>

<template>
  
  <el-dialog
    v-model="dialogVisibleModel"
    width="700"
    :title="dialogTitle"
    :before-close="handleClose"
  >
    <el-scrollbar height="60vh" wrap-style="padding-right: 10px;">
      <!-- 编辑通道信息 -->
      <el-form label-width="110px" label-position="right">
        <el-row :gutter="16" style="margin-top: 12px">
          <el-col :span="24">
            <!-- 原文：选择的通道 -->
            <el-form-item :label="$t('components.dialog.channel.batch.selected_channels')">
              <!-- 原文：选择要修改的通道 -->
              <el-select
                v-model="selectedChannels"
                :placeholder="$t('components.dialog.channel.batch.selected_channels_placeholder')"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="4"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 原文：通道设置 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.batch.channel_settings')}}</el-divider>
        
        <!-- 原文：批量修改不会修改通道名称 -->
        <el-alert type="warning" show-icon :closable="false" :title="$t('components.dialog.channel.batch.no_channel_name_change')" />
        <el-row :gutter="16" style="margin-top: 12px">
          <el-col :span="8">
            <!-- 原文：启用 -->
            <el-form-item :label="$t('components.dialog.channel.batch.enabled')">
              <el-switch v-model="formModel.enabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 原文：可见 -->
            <el-form-item :label="$t('components.dialog.channel.batch.visible')">
              <el-switch v-model="formModel.visible" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 原文：温度设置 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.batch.temperature_settings')}}</el-divider>
        
        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：单位 -->
            <el-form-item :label="$t('components.dialog.channel.batch.unit')">
              <!-- 原文：选择单位 -->
              <el-select v-model="formModel.unit" :placeholder="$t('components.dialog.channel.batch.unit_placeholder')" clearable style="width: 100%">
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
        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：高限报警值 -->
            <el-form-item :label="$t('components.dialog.channel.batch.high_limit')">
              <el-input type="number" v-model="formModel.highLimit" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：低限报警值 -->
            <el-form-item :label="$t('components.dialog.channel.batch.low_limit')">
              <el-input type="number" v-model="formModel.lowLimit" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <!-- 原文：极限最大值 -->
            <el-form-item :label="$t('components.dialog.channel.batch.extreme_max')">
              <el-input type="number" v-model="formModel.extremeMax" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：极限最小值 -->
            <el-form-item :label="$t('components.dialog.channel.batch.extreme_min')">
              <el-input type="number" v-model="formModel.extremeMin" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 原文：传感器 -->
        <el-divider content-position="left">{{$t('components.dialog.channel.batch.sensor_settings')}}</el-divider>
        
        <el-row :gutter="16">
          <el-col :span="12">
            <!-- 原文：传感器类型 -->
            <el-form-item :label="$t('components.dialog.channel.batch.sensor_type')">
              <!-- 原文：选择类型 -->
              <el-select v-model="formModel.sensorType" :placeholder="$t('components.dialog.channel.batch.sensor_type_placeholder')" clearable style="width: 100%">
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
            <el-form-item :label="$t('components.dialog.channel.batch.sensor_model')">
              <!-- 原文：可选 -->
              <el-input v-model="formModel.sensorModel" :placeholder="$t('components.dialog.channel.batch.sensor_model_placeholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原文：传感器序列号 -->
            <el-form-item :label="$t('components.dialog.channel.batch.sensor_serial')">
              <!-- 原文：可选 -->
              <el-input v-model="formModel.sensorSerial" :placeholder="$t('components.dialog.channel.batch.sensor_serial_placeholder')" />
            </el-form-item>
          </el-col>

          
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <!-- 原文：取消 -->
      <el-button @click="handleCancel">{{ $t('components.dialog.channel.batch.cancel') }}</el-button>
      <!-- 原文：应用 -->
      <el-button type="primary" @click="handleSave">{{ $t('components.dialog.channel.batch.apply') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>