<script setup>
import { useInstrumentStore } from '@/stores/instrument'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { title } = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  }
})

const instrumentStore = useInstrumentStore()

// todo 当前仪器信息
const currentInstrument = computed(() => instrumentStore.currentInstrument)

// todo 通道配置 根据仪器信息动态生成
const channelOpts = computed(() => {
  const base = [{ value: 'all', label: t('view.dataview.datalayout.all') }] // 原文：全部
  const channels = currentInstrument.value?.channels || []
  const items = channels.map(item => ({
    value: item.channelID,
    label: `${item.channelName} ${item.sensorType} ${item.unit}`
  }))

  return base.concat(items)
})

// todo 选择显示的通道 需要从配置文件或仪器信息中获取预设值
const dataGridShowChannel = ref([])

const DEFAULT_PAGE_SIZE = 8

const page = reactive({
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  showAll: false
})

const channelCount = computed(() => currentInstrument.value?.channels?.length || 0)

watch(channelCount, (len) => {
  page.total = len
  const maxPage = Math.max(1, Math.ceil(len / page.pageSize))
  if (page.currentPage > maxPage) page.currentPage = maxPage
}, { immediate: true })

const handlePageChange = (newPage) => {
  page.currentPage = newPage
}

const handleChange = (value) => {
  // 当选择全部时，显示所有通道
  if (value.includes('all')) {
    dataGridShowChannel.value = channelOpts.value.slice(1).map(item => item.value)
  } else {
    dataGridShowChannel.value = value
  }

  // todo 将选择的情况持久化到配置文件和状态管理中
}

// 放大缩小显示所有通道
const handleShowAll = () => {
  page.showAll = !page.showAll
}

const showAllLabel = computed(() => page.showAll
  ? t('view.dataview.datalayout.shrink') // 原文：缩小
  : t('view.dataview.datalayout.expand')) // 原文：放大
</script>

<template>
  <el-card class="data-grid-view">
    <template #header>
      <el-text type="primary">【{{currentInstrument.insName || ' '}}】{{ title }}</el-text>
    </template>
    <div class="data-grid-toolbar">
      <el-select
          v-model="dataGridShowChannel"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :placeholder="$t('view.dataview.datalayout.channel_select_placeholder')" <!-- 原文：通道选择 -->
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

        <!-- todo 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="page.total"
          :current-page="page.currentPage"
          :hide-on-single-page="true"
          :disabled="page.showAll"
          @current-change="handlePageChange"
        />
        <button class="fake-pagination-btn" @click="handleShowAll">
          {{ showAllLabel }}
        </button>
    </div>
    <slot name="default" :page="page"></slot>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px 15px;
  background-color: #f5f7fa;
}

.data-grid-toolbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0 0 0;
}

:deep(.el-pagination) {
  margin-left: 5%;
}

.fake-pagination-btn {
  background-color: #f0f2f5;
  margin: 0 4px 0 8px;

  align-items: center;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  color: #303133;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 32px;
  justify-content: center;
  line-height: 32px;
  min-width: 32px;
  padding: 0 8px;
  text-align: center;

  &:hover {
    color: #409eff;
  }
}
</style>