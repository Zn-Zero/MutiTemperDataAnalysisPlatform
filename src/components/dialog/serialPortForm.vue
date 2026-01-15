<script setup>
import BaseInfoForm from './components/baseInfoForm.vue'
import ProdInfo from './components/prodInfo.vue'

const portFormDialogVisibleModel = defineModel({
  type: Boolean,
  required: true
})

const { title } = defineProps({
  title: {
    type: String,
    default: '添加仪器'
  }
})

const handleClose = (done) => {
  portFormDialogVisibleModel.value = false
  done()
}

</script>

<template>
  
  <el-dialog
    v-model="portFormDialogVisibleModel"
    width="700"
    :title="title"
    :before-close="handleClose"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <base-info-form @close-form="handleClose"/>
      </el-tab-pane>
      <el-tab-pane label="通道个性化设置">
        <base-info-form />
      </el-tab-pane>
      <el-tab-pane label="产品标识">
        <prod-info />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style scoped>

</style>