<template>
  <el-dropdown
    ref="dropdownRef"
    :virtual-ref="triggerRef"
    :show-arrow="false"
    :popper-options="{
      modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
    }"
    virtual-triggering
    trigger="contextmenu"
    placement="bottom-start"
    @command="handleMenuCommand"
  >
    <template #dropdown>
      <el-dropdown-menu>
        <slot name="menu-item"></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
// import { onClickOutside } from '@vueuse/core'

const { position } = defineProps({
  // 右键菜单位置
  position: {
    type: Object,
    default: () => DOMRect.fromRect({ x: 0, y: 0}),
  },
})
const emits = defineEmits(['menu-click'])

// 暴露给父组件的方法：打开/关闭菜单
defineExpose({
  openMenu: () => {
    dropdownRef.value?.handleOpen()
    showMenu.value = true
  },
  closeMenu: () => {
    dropdownRef.value?.handleClose()
    showMenu.value = false
  }
})

const dropdownRef = ref(null)
const showMenu = ref(false)

const triggerRef = ref({
  getBoundingClientRect: () => position,
})

// 处理右键菜单点击
const handleMenuCommand = (command) => {
  emits('menu-click', command)
  // 点击菜单项后关闭菜单
  dropdownRef.value.handleClose()
  showMenu.value = false
}

const switchMenuVisible = () => {
  if (showMenu.value) {
    dropdownRef.value?.handleClose()
    showMenu.value = false
  } else {
    dropdownRef.value?.handleOpen()
    showMenu.value = true
  }
}

// onClickOutside(dropdownRef, () => {
//   console.log('点击外部，关闭右键菜单')
//   dropdownRef.value?.handleClose()
// })

watch(
  () => position,
  () => {
    // 坐标变化时重新触发定位计算
    // switchMenuVisible()
    dropdownRef.value?.handleOpen()
  },
  { deep: true }
)

</script>

<style scoped>

</style>