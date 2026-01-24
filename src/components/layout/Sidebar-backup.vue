<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useInstrumentStore } from '@/stores/instrument'
import {
  Monitor,
  Menu,
  Cpu
} from '@element-plus/icons-vue'


const instrumentStore = useInstrumentStore()

// 仪器列表数据
const instrumentList = instrumentStore.instrumentList

// 仪器树数据
const instrumentTree = reactive([
  {
    id: 1,
    icon: 'Menu',
    label: '仪器管理',
    children: []
  }
])
/*--------------------------------------------------------*/

// 右键菜单状态
const contextMenuVisible = ref(false)
const contextMenuStyle = reactive({ top: '0px', left: '0px' })
const contextMenuTarget = ref(null)

const contextMenuItems = [
  { key: 'view', label: '查看' },
  { key: 'edit', label: '编辑' },
  { key: 'delete', label: '删除' }
]

const onNodeContextMenu = (event, node, data) => {
  event.preventDefault()
  contextMenuTarget.value = { node, data }
  // 使用固定定位，基于视口坐标
  contextMenuStyle.top = `${event.clientY}px`
  contextMenuStyle.left = `${event.clientX}px`
  contextMenuVisible.value = true
}

const onMenuItemClick = (item) => {
  contextMenuVisible.value = false
  const target = contextMenuTarget.value
  if (!target) return

  // 简单示例：使用消息提示。这里可以替换为具体操作。
  ElMessage.info(`${item.label} - ${target.data.label}`)
}

const hideContextMenu = () => {
  contextMenuVisible.value = false
}

const onDocumentClick = (e) => {
  // 点击页面任意位置关闭菜单
  if (contextMenuVisible.value) {
    hideContextMenu()
  }
}
/*--------------------------------------------------------*/
onMounted(() => {
  // 构建仪器树数据
  instrumentTree[0].children = []
  instrumentTree[0].children = instrumentList.map((ins, index) => {
    return {
      id: (index + 1) * 100,
      icon: 'Monitor',
      label: ins.insName || `仪器${index + 1}`,
      children: Array.from({ length: ins.channelAmount }, (_, i) => ({
        id: (index + 1) * 10000 + i + 1,
        label: `${ins.channels?.[i]?.channelName || `CH${i + 1}`}`
      }))
    }
  })

  /*--------------------------------------------------------*/
  document.addEventListener('click', onDocumentClick)
  /*--------------------------------------------------------*/
})
/*--------------------------------------------------------*/
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
/*--------------------------------------------------------*/
</script>

<template>
  <el-tree
    ref="InstrumentTree"
    class="instrument-tree"
    :data="instrumentTree"
    node-key="id"
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <!------------------------------------------------------------>
      <div class="instrument-node" @contextmenu.prevent="onNodeContextMenu($event, node, data)">
      <!------------------------------------------------------------>
        <el-icon v-if="data.icon === 'Monitor'" size="20"><Monitor /></el-icon>
        <el-icon v-else-if="data.icon === 'Menu'" size="20"><Menu /></el-icon>
        <el-icon v-else size="20"><Cpu /></el-icon>
        <span>{{ node.label }}</span>
      </div>
    </template>
  </el-tree>
  <!-------------------------右键菜单---------------------------->
  <div
    v-if="contextMenuVisible"
    class="tree-context-menu"
    :style="{ top: contextMenuStyle.top, left: contextMenuStyle.left }"
    @click.stop
  >
    <ul>
      <li v-for="item in contextMenuItems" :key="item.key" @click="onMenuItemClick(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
  <!------------------------------------------------------------>
</template>

<style scoped lang="scss">
.instrument-tree {
  background-color: unset;
  max-width: 250px;
}
  
.instrument-node {
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f0f2f5;
  }
}
// --------------------------------------------------------
.tree-context-menu {
  position: fixed;
  z-index: 10000;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.12);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 4px 0;
  border-radius: 4px;
  min-width: 120px;
}

.tree-context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tree-context-menu li {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
}

.tree-context-menu li:hover {
  background: #f5f7fa;
}
// --------------------------------------------------------
</style>