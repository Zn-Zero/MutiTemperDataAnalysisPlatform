<script setup>
import { onClickOutside } from '@vueuse/core'
import { useInstrumentStore } from '@/stores/instrument'
import {
  Monitor,
  Menu,
  Cpu,
  Edit,
  Delete,
  View
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

// todo 右键菜单相关状态 待修复
const menuVisible = ref(false) // 菜单显示状态
const menuPosition = ref({ x: 0, y: 0 }) // 菜单位置
const currentNode = ref(null) // 当前右键点击的节点
const dropdownRef = ref(null)
const triggerRef = ref({
  getBoundingClientRect: () => menuPosition.value
})

// 处理树节点右键事件
const handleContextMenu = (event, data) => {
  event.preventDefault() // 阻止浏览器默认右键菜单
  currentNode.value = data // 记录当前节点
  // 设置菜单位置
  menuPosition.value = DOMRect.fromRect({
    x: event.clientX,
    y: event.clientY,
  })
  // menuVisible.value = true // 显示菜单
  dropdownRef.value?.handleOpen()
  console.log(menuPosition.value)
}


// 右键菜单点击事件示例
const handleMenuClick = (action) => {
  menuVisible.value = false // 关闭菜单
  switch (action) {
    case 'view':
      console.log('查看节点', currentNode.value)
      // 实现查看逻辑
      break
    case 'edit':
      console.log('编辑节点', currentNode.value)
      // 实现编辑逻辑
      break
    case 'delete':
      console.log('删除节点', currentNode.value)
      // 实现删除逻辑
      break
  }
}

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
})

</script>

<template>
  <div>
    <el-tree
      ref="InstrumentTree"
      class="instrument-tree"
      :data="instrumentTree"
      node-key="id"
      :expand-on-click-node="false"
      @contextmenu="handleContextMenu"
    >
      <template #default="{ node, data }">
        <div class="instrument-node">
          <el-icon v-if="data.icon === 'Monitor'" size="20"><Monitor /></el-icon>
          <el-icon v-else-if="data.icon === 'Menu'" size="20"><Menu /></el-icon>
          <el-icon v-else size="20"><Cpu /></el-icon>
          <span>{{ node.label }}</span>
        </div>
      </template>
    </el-tree>
    <!-------------------------右键菜单---------------------------->
    <el-dropdown
      ref="dropdownRef"
      v-model="menuVisible"
      :virtual-ref="triggerRef"
      :show-arrow="false"
      :popper-options="{
        modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
      }"
      virtual-triggering
      trigger="contextmenu"
      placement="bottom-start"
    >
      <el-dropdown-menu>
        <el-dropdown-item :icon="View" @click="handleMenuClick('view')">
          <span>查看</span>
        </el-dropdown-item>
        <el-dropdown-item :icon="Edit" @click="handleMenuClick('edit')">
          <span>编辑</span>
        </el-dropdown-item>
        <el-dropdown-item :icon="Delete" @click="handleMenuClick('delete')" divided>
          <span>删除</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!------------------------------------------------------------>
  </div>
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

// 自定义右键菜单样式（可选）
// :deep(.el-dropdown-menu) {
//   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//   border-radius: 4px;
// }
</style>