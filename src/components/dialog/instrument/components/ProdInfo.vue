<script setup>
import { isBlank } from '@/utils/index'

const emit = defineEmits(['closeForm'])

// todo 默认值填充
const form = reactive({
  manufacturer: null,  // 生产厂家
  productType: null,   // 产品类型
  productNo: null,     // 产品编号
  operator: null,      // 操作人员
  addWatermark: false,  // 添加水印
  addHeader: false,     // 添加页眉
  companyName: null,   // 公司名称
  companyPhone: null,  // 公司电话
  companyFax: null,    // 公司传真
  companyWebsite: null,// 公司网址
  companyAddress: null,// 公司地址
  logoPath: null       // logo路径
})

const onSubmit = () => {
  // todo 提交表单逻辑
  // todo 提交逻辑后,emit关闭表单事件
  emit('closeForm')
}

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.manufacturer')"><!-- 生产厂家 -->
          <el-input v-model="form.manufacturer" :placeholder="$t('components.dialog.instrument.prodinfo.enter_manufacturer')" /><!-- 请输入生产厂家 -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.product_type')"><!-- 产品类型 -->
          <el-input v-model="form.productType" :placeholder="$t('components.dialog.instrument.prodinfo.enter_product_type')" /><!-- 请输入产品类型 -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.product_no')"><!-- 产品编号 -->
          <el-input v-model="form.productNo" :placeholder="$t('components.dialog.instrument.prodinfo.enter_product_no')" /><!-- 请输入产品编号 -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.operator')"><!-- 操作人员 -->
          <el-input v-model="form.operator" :placeholder="$t('components.dialog.instrument.prodinfo.enter_operator')" /><!-- 请输入操作人员 -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.add_watermark')"><!-- 添加水印 -->
          <el-switch v-model="form.addWatermark" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.add_header')"><!-- 添加页眉 -->
          <el-switch v-model="form.addHeader" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.company_name')"><!-- 公司名称 -->
          <el-input v-model="form.companyName" :placeholder="$t('components.dialog.instrument.prodinfo.enter_company_name')" /><!-- 请输入公司名称 -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.company_phone')"><!-- 公司电话 -->
          <el-input v-model="form.companyPhone" :placeholder="$t('components.dialog.instrument.prodinfo.enter_company_phone')" /><!-- 请输入公司电话 -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.company_fax')"><!-- 公司传真 -->
          <el-input v-model="form.companyFax" :placeholder="$t('components.dialog.instrument.prodinfo.enter_company_fax')" /><!-- 请输入公司传真 -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.company_website')"><!-- 公司网址 -->
          <el-input v-model="form.companyWebsite" :placeholder="$t('components.dialog.instrument.prodinfo.enter_company_website')" /><!-- 请输入公司网址 -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.company_address')"><!-- 公司地址 -->
          <el-input v-model="form.companyAddress" :placeholder="$t('components.dialog.instrument.prodinfo.enter_company_address')" /><!-- 请输入公司地址 -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-form-item :label="$t('components.dialog.instrument.prodinfo.logo_path')"><!-- logo路径 -->
          <el-input v-model="form.logoPath" :placeholder="$t('components.dialog.instrument.prodinfo.enter_logo_path')" /><!-- 请输入logo路径 -->
        </el-form-item>
      </el-col>
      <el-col :span="6" v-if="!isBlank(form.logoPath)">
        <el-image :src="form.logoPath" style="width: 100%;" />
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ $t('components.dialog.instrument.prodinfo.save_config') }}</el-button><!-- 保存配置 -->
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>