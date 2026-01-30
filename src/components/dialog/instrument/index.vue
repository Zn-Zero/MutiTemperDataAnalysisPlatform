<script setup>
import BaseInfoForm from './components/BaseInfoForm.vue'
import costumSetting from './components/CostumSetting.vue'
import ProdInfo from './components/ProdInfo.vue'

const dialogVisibleModel = defineModel({
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
  dialogVisibleModel.value = false
  done()
}

</script>

<template>
  
  <el-dialog
    v-model="dialogVisibleModel"
    width="700"
    :title="title"
    :before-close="handleClose"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <base-info-form @close-form="handleClose"/>
      </el-tab-pane>
      <el-tab-pane label="通道个性化设置">
        <costum-setting />
      </el-tab-pane>
      <el-tab-pane label="产品标识">
        <prod-info />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style scoped>

</style>