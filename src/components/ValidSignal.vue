<script setup>
import {
  SuccessFilled,
  WarningFilled
} from '@element-plus/icons-vue'

const { inValid } = defineProps({
  inValid: {
    type: Boolean,
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
}
</script>

<template>
  <el-icon
    v-if="inValid"
    class="pass"
    :size="size"
  >
    <SuccessFilled />
  </el-icon>
  <el-icon
    v-else
    :class="{
      'warning': true,
      'flicker': isFlicker
    }"
    :size="size"
    @click="clickToStopFlicker"
  >
    <WarningFilled />
  </el-icon>
</template>

<style scoped lang="scss">
.pass {
 color: #00ff00;
}

.warning {
 color: #ff0000;
}

.flicker {
  animation: flickerAnimation 0.5s infinite;
  cursor: pointer;
}

@keyframes flickerAnimation {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>