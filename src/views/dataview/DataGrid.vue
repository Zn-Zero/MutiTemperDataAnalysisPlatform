<script setup>
import DataLayout from './DataLayout.vue'
import ValidSignal from '@/components/ValidSignal.vue'
import { useInstrumentStore } from '@/stores/instrument'

const instrumentStore = useInstrumentStore()

// 当前仪器信息
const currentInstrument = computed(() => instrumentStore.currentInstrument)

onMounted(() => {

})
</script>

<template>
  <data-layout>
    <template #default="{ page }">
      <el-row class="data-grid-container" :gutter="20">
      <el-col :span="6">
        <el-card class="channel-view" shadow="never">
          <template #header>CH1 K ℃</template>
          <el-text class="current-temperature">--.--</el-text>
          <div class="sub-info-row max-temperature">
            <el-text>Max: --.--</el-text>
            <valid-signal :inValid="true" />
          </div>
          <div class="sub-info-row min-temperature">
            <el-text>Min: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <div class="sub-info-row ave-temperature">
            <el-text>Ave: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <template #footer>通道1</template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="channel-view" shadow="hover">
          <template #header>CH2 K ℃</template>
          <el-text class="current-temperature">--.--</el-text>
          <div class="sub-info-row max-temperature">
            <el-text>Max: --.--</el-text>
            <valid-signal :inValid="true" />
          </div>
          <div class="sub-info-row min-temperature">
            <el-text>Min: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <div class="sub-info-row ave-temperature">
            <el-text>Ave: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <template #footer>通道2</template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="channel-view" shadow="hover">
          <template #header>CH3 K ℃</template>
          <el-text class="current-temperature">--.--</el-text>
          <div class="sub-info-row max-temperature">
            <el-text>Max: --.--</el-text>
            <valid-signal :inValid="true" />
          </div>
          <div class="sub-info-row min-temperature">
            <el-text>Min: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <div class="sub-info-row ave-temperature">
            <el-text>Ave: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <template #footer>通道3</template>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="channel-view" shadow="hover">
          <template #header>CH4 K ℃</template>
          <el-text class="current-temperature">--.--</el-text>
          <div class="sub-info-row max-temperature">
            <el-text>Max: --.--</el-text>
            <valid-signal :inValid="true" />
          </div>
          <div class="sub-info-row min-temperature">
            <el-text>Min: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <div class="sub-info-row ave-temperature">
            <el-text>Ave: --.--</el-text>
            <valid-signal :inValid="false" />
          </div>
          <template #footer>通道4</template>
        </el-card>
      </el-col>
    </el-row>
    </template>
  </data-layout>
</template>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px 15px;
  background-color: #f5f7fa;
}

:deep(.el-card__footer) {
  padding: 7px 10px;
  background-color: #f5f7fa;
}

:deep(.channel-view) {
  .el-card__header {
    padding: 7px 10px;
  }
}

.current-temperature {
  font-size: 32px;
  font-weight: bold;
}

.sub-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  .el-text {
    font-size: 16px;
  }
}
</style>