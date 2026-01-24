<script setup>
import { useInstrumentStore } from '@/stores/instrument'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const instrumentStore = useInstrumentStore()

// todo 当前仪器信息
const currentInstrument = computed(() => instrumentStore.currentInstrument)

// 根据路由改变名称
const route = useRoute()
const title = computed(() => {
  return route.params.dataViewName
})

// todo 通道配置 根据仪器信息动态生成
const channelOpts = [//label 根据实际通道的名称、单位、温度等信息生成
  { value: 'all', label: '全部' }
]

// todo 选择显示的通道 需要从配置文件或仪器信息中获取预设值
const dataGridShowChannel = ref([])

const page = reactive({
  currentPage: 1,
  pageSize: 1,
  total: 8
})

const handleChange = (value) => {
  // 当选择全部时，显示所有通道
  if (value.includes('all')) {
    dataGridShowChannel.value = channelOpts.slice(1).map(item => item.value)
  } else {
    dataGridShowChannel.value = value
  }

  // todo 将选择的情况持久化到配置文件和状态管理中
}

onMounted(() => {
  // currentInstrument.channels.map(item => {
  //   channelOpts.push({
  //     value: item.channelId,
  //     label: `${item.channelName} ${item.sensorType} ${item.unit}`
  //   })
  // })

  // page.total = currentInstrument.channels.length / 8
})
</script>

<template>
  <el-card class="data-grid-view">
    <template #header>【{{currentInstrument.insName || ' '}}】{{ title }}</template>
    <el-row>
      <el-col :span="8">
        <el-select
          v-model="dataGridShowChannel"
          multiple
          placeholder="通道选择"
          style="width: 240px"
          @change="handleChange"
        >
          <el-option
            v-for="item in channelOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <!-- todo 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="page.total"
        />
      </el-col>
    </el-row>
    <slot name="default" :page="page"></slot>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px 15px;
  background-color: #f5f7fa;
}
</style>