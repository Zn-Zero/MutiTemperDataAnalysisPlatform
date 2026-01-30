<script setup>
import {
  SuccessFilled,
  WarningFilled,
  WarnTriangleFilled
} from '@element-plus/icons-vue'

const { inValid } = defineProps({
  inValid: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    default: '20px'
  }
})

watch(() => inValid, (newVal) => {
  if (!newVal) {
    isFlicker.value = true
  }
})

const isFlicker = ref(true)

const clickToStopFlicker = () => {
  isFlicker.value = false
  // todo log 记录点击取消闪烁的时间
  // todo 将状态持久化到配置文件和状态管理中
}
</script>

<template>
  <el-icon v-if="inValid === 0" class="pass" :size="size">
    <SuccessFilled />
  </el-icon>
  <el-icon v-else-if="inValid === 1" class="warning" :size="size">
    <WarningFilled />
  </el-icon>
  <el-icon v-else-if="inValid === 2" :class="{'danger': true, 'flicker': isFlicker}" :size="size" @click="clickToStopFlicker">
    <WarnTriangleFilled />
  </el-icon>
</template>

<style scoped lang="scss">
</style>