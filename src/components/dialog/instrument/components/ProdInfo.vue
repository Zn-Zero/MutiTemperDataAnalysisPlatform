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
        <el-form-item label="生产厂家">
          <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="产品类型">
          <el-input v-model="form.productType" placeholder="请输入产品类型" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="产品编号">
          <el-input v-model="form.productNo" placeholder="请输入产品编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="操作人员">
          <el-input v-model="form.operator" placeholder="请输入操作人员" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="添加水印">
          <el-switch v-model="form.addWatermark" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="添加页眉">
          <el-switch v-model="form.addHeader" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="公司电话">
          <el-input v-model="form.companyPhone" placeholder="请输入公司电话" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="公司传真">
          <el-input v-model="form.companyFax" placeholder="请输入公司传真" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="公司网址">
          <el-input v-model="form.companyWebsite" placeholder="请输入公司网址" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="公司地址">
          <el-input v-model="form.companyAddress" placeholder="请输入公司地址" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-form-item label="logo路径">
          <el-input v-model="form.logoPath" placeholder="请输入logo路径" />
        </el-form-item>
      </el-col>
      <el-col :span="6" v-if="!isBlank(form.logoPath)">
        <el-image :src="form.logoPath" style="width: 100%;" />
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存配置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>