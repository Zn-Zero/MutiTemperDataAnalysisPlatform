<script setup>
import * as echarts from 'echarts'
onMounted(() => {
  // 初始化图表
  // const dataBarChart = ref(null)
  // const myChart = echarts.init(dataBarChart.value)

  // const option = {
  //   title: {
  //     text: '柱状图示例'
  //   },
  //   tooltip: {},
  //   xAxis: {
  //     data: ['A', 'B', 'C', 'D', 'E', 'F']
  //   },
  //   yAxis: {},
  //   series: [
  //     {
  //       name: '销量',
  //       type: 'bar',
  //       data: [5, 20, 36, 10, 10, 20]
  //     }
  //   ]
  // }

  // myChart.setOption(option)
})
</script>

<template>
  <div>DataBar</div>
  <div ref="dataBarChart" class="chart">
    
  </div>
</template>

<style scoped lang="scss">

</style>