<script setup>
import { useInstrumentStore } from '@/stores/instrument'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closeForm'])

const instrumentStore = useInstrumentStore()



// 通道个性化设置默认值填充
const channelConfig = ref([])

const showChannels = ref(1)

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
  instrumentStore.generateDefaultChannelConfig()

  // todo 添加仪器时，此界面不允许编辑。编辑仪器时，需从已有配置中读取
  channelConfig.value = instrumentStore.channelConfig
})

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="显示通道">
          <el-radio-group v-model="showChannels">
            <el-radio value="1">01~08 通道</el-radio>
            <el-radio value="2">09~16 通道</el-radio>
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
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="通道一">
          <el-input v-model="input1" placeholder="Please input">
            <template #append>
              <el-color-picker v-model="color1" />
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="通道二">
          <el-input v-model="input2" placeholder="Please input">
            <template #append>
              <el-color-picker v-model="color2" />
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存配置</el-button>
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