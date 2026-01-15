<script setup>
import { useInstrumentStore } from '@/stores/instrument'

const emit = defineEmits(['closeForm'])

const instrumentStore = useInstrumentStore()

// 通道个性化设置默认值填充
const channelConfig = instrumentStore.channelConfig

// todo 默认值填充
const obj = {
  channelID: i + 1,
  channelName: `通道${i + 1}`,
  highLimit: null,
  lowLimit: null,
  ave: null,
  unit: '',
  enabled: true,
  color: defaultColors[i % defaultColors.length]
}

const showChannels = ref(1)

const onSubmit = () => {
  // todo 提交表单逻辑
  // todo 提交逻辑后,emit关闭表单事件
  emit('closeForm')
}

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-row gutter="20">
      <el-col :span="24">
        <el-form-item label="显示通道">
          <el-radio-group v-model="showChannels">
            <el-radio value="1">1~8 通道</el-radio>
            <el-radio value="2">9~16 通道</el-radio>
            <el-radio value="3">17~24 通道</el-radio>
            <el-radio value="4">25~32 通道</el-radio>
            <el-radio value="5">33~40 通道</el-radio>
            <el-radio value="6">41~48 通道</el-radio>
            <el-radio value="7">49~56 通道</el-radio>
            <el-radio value="8">57~64 通道</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col :span="12">
        <el-form-item label="生产厂家">
          <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="产品类型">
          <el-input v-model="form.productType" placeholder="请输入产品类型" />
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