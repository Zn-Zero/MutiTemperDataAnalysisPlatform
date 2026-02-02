<script setup>
import { useInstrumentFormConfigStore } from '@/stores/instrumentFormConfig'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeForm'])

const instrumentFormConfigStore = useInstrumentFormConfigStore()

// 通道个性化设置默认值填充
const channel = ref([])

const showChannelGroup = ref(1)

const onSubmit = () => {
  // todo 提交表单逻辑
  // todo 提交逻辑后,emit关闭表单事件
  emit('closeForm')
}
const input1 = ref('')
const color1 = ref('#ff0000')
const input2 = ref('')
const color2 = ref('#00ff00')

onMounted(() => {
  // todo 临时的默认值填充，后续在创建仪器时动态生成
  // instrumentFormConfigStore.generateDefaultChannel()

  // todo 添加仪器时，此界面不允许编辑。编辑仪器时，需从已有配置中读取
  channel.value = instrumentFormConfigStore.channel
})

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="$t('components.dialog.instrument.costumsetting.show_channel')"><!-- 显示通道 -->
          <el-radio-group v-model="showChannelGroup">
            <el-radio value="1">{{ $t('components.dialog.instrument.costumsetting.channel_01_08') }}</el-radio><!-- 01~08 通道 -->
            <el-radio value="2">{{ $t('components.dialog.instrument.costumsetting.channel_09_16') }}</el-radio><!-- 09~16 通道 -->
            <el-radio value="3">{{ $t('components.dialog.instrument.costumsetting.channel_17_24') }}</el-radio><!-- 17~24 通道 -->
            <el-radio value="4">{{ $t('components.dialog.instrument.costumsetting.channel_25_32') }}</el-radio><!-- 25~32 通道 -->
            <el-radio value="5">{{ $t('components.dialog.instrument.costumsetting.channel_33_40') }}</el-radio><!-- 33~40 通道 -->
            <el-radio value="6">{{ $t('components.dialog.instrument.costumsetting.channel_41_48') }}</el-radio><!-- 41~48 通道 -->
            <el-radio value="7">{{ $t('components.dialog.instrument.costumsetting.channel_49_56') }}</el-radio><!-- 49~56 通道 -->
            <el-radio value="8">{{ $t('components.dialog.instrument.costumsetting.channel_57_64') }}</el-radio><!-- 57~64 通道 -->
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.costumsetting.channel_one')"><!-- 通道一 -->
          <el-input v-model="input1" placeholder="Please input">
            <template #append>
              <el-color-picker v-model="color1" />
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.costumsetting.channel_two')"><!-- 通道二 -->
          <el-input v-model="input2" placeholder="Please input">
            <template #append>
              <el-color-picker v-model="color2" />
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ $t('components.dialog.instrument.costumsetting.save_config') }}</el-button><!-- 保存配置 -->
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  :deep(.el-input-group__append) {
    padding: 0 !important;
    border: 0 !important;
    background: unset !important;
  }
</style>