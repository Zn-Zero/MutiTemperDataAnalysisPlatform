<script setup>
import { ElLoading } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const dialogVisibleModel = defineModel({
  type: Boolean,
  required: true
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const dialogTitle = computed(() => props.title || t('components.dialog.language.title'))

const curLang = localStorage.getItem('app-locale') || 'en-US';

const handleClose = (done) => {
  dialogVisibleModel.value = false
  done()
}

const handleChangeLanguage = (val) => {
  const loading = ElLoading.service({
    lock: true,
    text: t('components.dialog.language.changing'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  locale.value = val
  localStorage.setItem('app-locale', val)
  window.osApi.changeLocale(val) // 通知主进程更改语言

  setTimeout(() => {
    loading.close()
  }, 2000)
}

</script>

<template>
  <el-dialog
    v-model="dialogVisibleModel"
    width="500"
    :title="dialogTitle"
    :before-close="handleClose"
  >
    <el-row>
      <el-col :span="8">
        <el-text>{{ $t('components.dialog.language.current') }}{{ curLang }}</el-text>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button type="primary" plain @click="handleChangeLanguage('zh-CN')">简体中文</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" plain @click="handleChangeLanguage('en-US')">English</el-button>
      </el-col>
      <!-- <el-col :span="8">
        <el-button type="primary" plain @click="handleChangeLanguage('zh-TW')">繁體中文</el-button>
      </el-col> -->
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>