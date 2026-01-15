<script setup>
import {
  Monitor,
  Menu,
  Cpu
} from '@element-plus/icons-vue'

const instrumentList = ref([
  {
    id: 1,
    icon: 'Menu',
    label: '仪器管理',
    children: [
      {
        id: 101,
        icon: 'Monitor',
        label: '仪器一',
        children: [
          { id: 10101, label: '通道1' },
          { id: 10102, label: '通道2' },
          { id: 10103, label: '通道3' },
          { id: 10104, label: '通道4' },
          { id: 10105, label: '通道5' },
          { id: 10106, label: '通道6' },
          { id: 10107, label: '通道7' },
          { id: 10108, label: '通道8' }
        ]
      },
      {
        id: 102,
        label: '仪器二',
        icon: 'Monitor',
        children: [
          { id: 10201, label: '通道1' },
          { id: 10202, label: '通道2' },
          { id: 10203, label: '通道3' },
          { id: 10204, label: '通道4' },
          { id: 10205, label: '通道5' },
          { id: 10206, label: '通道6' },
          { id: 10207, label: '通道7' },
          { id: 10208, label: '通道8' },
          { id: 10209, label: '通道9' },
          { id: 10210, label: '通道10' },
          { id: 10211, label: '通道11' },
          { id: 10212, label: '通道12' },
          { id: 10213, label: '通道13' },
          { id: 10214, label: '通道14' },
          { id: 10215, label: '通道15' },
          { id: 10216, label: '通道16' }
        ]
      },
      {
        id: 103,
        label: '仪器三',
        icon: 'Monitor',
        children: [
          { id: 10301, label: '通道1' },
          { id: 10302, label: '通道2' },
          { id: 10303, label: '通道3' },
          { id: 10304, label: '通道4' },
          { id: 10305, label: '通道5' },
          { id: 10306, label: '通道6' },
          { id: 10307, label: '通道7' },
          { id: 10308, label: '通道8' },
          { id: 10309, label: '通道9' },
          { id: 10310, label: '通道10' },
          { id: 10311, label: '通道11' },
          { id: 10312, label: '通道12' },
          { id: 10313, label: '通道13' },
          { id: 10314, label: '通道14' },
          { id: 10315, label: '通道15' },
          { id: 10316, label: '通道16' },
          { id: 10317, label: '通道17' },
          { id: 10318, label: '通道18' },
          { id: 10319, label: '通道19' },
          { id: 10320, label: '通道20' },
          { id: 10321, label: '通道21' },
          { id: 10322, label: '通道22' },
          { id: 10323, label: '通道23' },
          { id: 10324, label: '通道24' },
          { id: 10325, label: '通道25' },
          { id: 10326, label: '通道26' },
          { id: 10327, label: '通道27' },
          { id: 10328, label: '通道28' },
          { id: 10329, label: '通道29' },
          { id: 10330, label: '通道30' },
          { id: 10331, label: '通道31' },
          { id: 10332, label: '通道32' }
        ]
      },
      {
        id: 104,
        label: '仪器四',
        icon: 'Monitor',
        children: [
          { id: 10401, label: '通道1' },
          { id: 10402, label: '通道2' },
          { id: 10403, label: '通道3' },
          { id: 10404, label: '通道4' },
          { id: 10405, label: '通道5' },
          { id: 10406, label: '通道6' },
          { id: 10407, label: '通道7' },
          { id: 10408, label: '通道8' },
          { id: 10409, label: '通道9' },
          { id: 10410, label: '通道10' },
          { id: 10411, label: '通道11' },
          { id: 10412, label: '通道12' },
          { id: 10413, label: '通道13' },
          { id: 10414, label: '通道14' },
          { id: 10415, label: '通道15' },
          { id: 10416, label: '通道16' },
          { id: 10417, label: '通道17' },
          { id: 10418, label: '通道18' },
          { id: 10419, label: '通道19' },
          { id: 10420, label: '通道20' },
          { id: 10421, label: '通道21' },
          { id: 10422, label: '通道22' },
          { id: 10423, label: '通道23' },
          { id: 10424, label: '通道24' },
          { id: 10425, label: '通道25' },
          { id: 10426, label: '通道26' },
          { id: 10427, label: '通道27' },
          { id: 10428, label: '通道28' },
          { id: 10429, label: '通道29' },
          { id: 10430, label: '通道30' },
          { id: 10431, label: '通道31' },
          { id: 10432, label: '通道32' },
          { id: 10433, label: '通道33' },
          { id: 10434, label: '通道34' },
          { id: 10435, label: '通道35' },
          { id: 10436, label: '通道36' },
          { id: 10437, label: '通道37' },
          { id: 10438, label: '通道38' },
          { id: 10439, label: '通道39' },
          { id: 10440, label: '通道40' },
          { id: 10441, label: '通道41' },
          { id: 10442, label: '通道42' },
          { id: 10443, label: '通道43' },
          { id: 10444, label: '通道44' },
          { id: 10445, label: '通道45' },
          { id: 10446, label: '通道46' },
          { id: 10447, label: '通道47' },
          { id: 10448, label: '通道48' },
          { id: 10449, label: '通道49' },
          { id: 10450, label: '通道50' },
          { id: 10451, label: '通道51' },
          { id: 10452, label: '通道52' },
          { id: 10453, label: '通道53' },
          { id: 10454, label: '通道54' },
          { id: 10455, label: '通道55' },
          { id: 10456, label: '通道56' },
          { id: 10457, label: '通道57' },
          { id: 10458, label: '通道58' },
          { id: 10459, label: '通道59' },
          { id: 10460, label: '通道60' },
          { id: 10461, label: '通道61' },
          { id: 10462, label: '通道62' },
          { id: 10463, label: '通道63' },
          { id: 10464, label: '通道64' }
        ]
      }
    ]
  }
])

</script>

<template>
  <el-tree
    ref="InstrumentTree"
    style="background-color: unset;max-width: 250px"
    :data="instrumentList"
    node-key="id"
    :expand-on-click-node="false"
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
</template>

<style scoped lang="scss">
.instrument-node {
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f0f2f5;
  }
}
</style>