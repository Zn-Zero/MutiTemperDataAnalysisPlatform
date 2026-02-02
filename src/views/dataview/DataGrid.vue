<script setup>
import DataLayout from './DataLayout.vue'
import ChannelForm from '@/components/dialog/channel/index.vue'
import BatchChannelForm from '@/components/dialog/channel/batch/index.vue'
import { useInstrumentStore } from '@/stores/instrument'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const instrumentStore = useInstrumentStore()

// 当前仪器信息
const currentInstrument = computed(() => instrumentStore.currentInstrument)

// 当前通道信息
const currentChannels = computed(() => {
  if (!currentInstrument.value) return null
  return currentInstrument.value.channels || null
})

const channelFormVisible = ref(false)
const batchChannelFormVisible = ref(false)

// 获取当前页的通道数据
const getPagedChannels = (pageInfo) => {
  if (!currentChannels.value) return []
  // 计算分页起始位置
  const start = (pageInfo.currentPage - 1) * pageInfo.pageSize
  return currentChannels.value.slice(start, start + pageInfo.pageSize)
}

// 右键菜单位置
const position = ref(DOMRect.fromRect({ x: 0, y: 0 }))
// 右键点击的通道
const clickedChannel = ref(null)
// 处理右键菜单事件
const handleContextmenu = (event, channel) => {
  const { clientX, clientY } = event
  // 设置右键菜单位置和点击的通道
  position.value = DOMRect.fromRect({
    x: clientX,
    y: clientY,
  })
  clickedChannel.value = channel
  event.preventDefault()
}

const handleContextmenuClick = (command) => {
  switch (command) {
    case 'copy-link':
      handleCopyLink(clickedChannel.value)
      break
    case 'edit-channel':
      channelFormVisible.value = true
      break
    case 'batch-edit':
      batchChannelFormVisible.value = true
      break
    default:
      break
  }
}

const handleCopyLink = (channel) => {
  try {
    window.osApi.copyToClipboard(`${channel.channelID}\t${channel.sensorType}\t${channel.current}` +
      `\tMax:${channel.max}\tMin:${channel.min}\tAve:${channel.average}\t${channel.channelName}`)
  } catch (error) {
    ElMessage.error(t('view.dataview.datagrid.copylink_failed')) // 原文：复制通道链接失败,请稍后重试
    console.error(t('view.dataview.datagrid.copylink_failed'), error) // 原文：复制通道链接失败,请稍后重试
    return
  }
}

onMounted(() => {

})

</script>

<template>
  <data-layout :title="$t('view.dataview.datagrid.title')" > <!-- 原文：仪表图 -->
    <template #default="{ page }">
      <el-scrollbar class="data-grid-scrollbar" style="height: calc(100vh - 190px);padding-top: 20px">
        <el-row v-if="!page.showAll" class="data-grid-container" :gutter="20">
          <el-col
            v-for="channel in getPagedChannels(page)"
            :key="channel.channelID"
            :span="6"
            style="margin-bottom: 20px"
          >
            <el-card class="channel-view" shadow="never" @contextmenu="handleContextmenu($event, channel)">
              <template #header>{{channel.channelID}} {{channel.sensorType}} {{channel.unit}}</template>
              <el-text class="current-temperature">{{channel.current}}</el-text>
              <div class="sub-info-row max-temperature">
                <el-text>{{ $t('view.dataview.datagrid.max_label') }} {{channel.max}}</el-text> <!-- 原文：Max: -->
                <valid-signal :inValid="0" />
              </div>
              <div class="sub-info-row min-temperature">
                <el-text>{{ $t('view.dataview.datagrid.min_label') }} {{channel.min}}</el-text> <!-- 原文：Min: -->
                <valid-signal :inValid="1" />
              </div>
              <div class="sub-info-row ave-temperature">
                <el-text>{{ $t('view.dataview.datagrid.avg_label') }} {{channel.average}}</el-text> <!-- 原文：Ave: -->
                <valid-signal :inValid="2" />
              </div>
              <template #footer>
                <div class="channel-name" :title="channel.channelName">
                  {{channel.channelName}}
                </div>
              </template>
            </el-card>
          </el-col>
        </el-row>

        <el-row v-else class="data-grid-container" :gutter="10">
          <el-col
            :span="6"
            v-for="channel in currentChannels"
            :key="channel.channelID"
            style="margin-bottom: 10px"
          >
            <div class="channel-view-simple" @contextmenu="handleContextmenu($event, channel)">
              <el-text>{{channel.channelID}}</el-text>
              <!-- <el-text>{{channel.sensorType}}</el-text> -->
              <!-- <el-text>{{channel.unit}}</el-text> -->
              <el-text :title="channel.channelName">{{channel.channelName}}</el-text>
              <el-text :class="{'flicker': channel.alarmed, 'warning': channel.alarmed}">{{channel.current}}</el-text>
            </div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </template>
  </data-layout>

  <context-menu :position="position" @menu-click="handleContextmenuClick">
    <template #menu-item>
      <el-dropdown-item command="copy-link">{{ $t('view.dataview.datagrid.copylink') }}</el-dropdown-item> <!-- 原文：将链接复制到剪贴板 -->
      <el-dropdown-item command="edit-channel">{{ $t('view.dataview.datagrid.editchannel') }}</el-dropdown-item> <!-- 原文：修改通道信息 -->
      <el-dropdown-item command="batch-edit">{{ $t('view.dataview.datagrid.batchedit') }}</el-dropdown-item> <!-- 原文：批量修改 -->
    </template>
  </context-menu>

  <channel-form v-model="channelFormVisible" :channel="clickedChannel"/>
  <batch-channel-form v-model="batchChannelFormVisible" />
</template>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px 15px;
  background-color: #f5f7fa;
}

:deep(.el-card__body) {
  padding: 0 15px 15px;
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

:deep(.data-grid-scrollbar) {
  overflow-x: hidden;
}

.data-grid-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
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

.channel-name {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-view-simple {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  cursor: pointer;

  .el-text {
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
} 
</style>