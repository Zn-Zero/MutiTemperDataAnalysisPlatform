<template>
  <div class="toolbar-content">
    <menu-dropdown />
    <communication-dropdown />
    <data-dropdown />
    <settings-dropdown />
    <help-dropdown />
    <div class="divider"></div>
  </div>
</template>

<script setup>
import MenuDropdown from './components/MenuDropdown.vue'
import CommunicationDropdown from './components/CommunicationDropdown.vue'
import DataDropdown from './components/DataDropdown.vue'
import SettingsDropdown from './components/SettingsDropdown.vue'
import HelpDropdown from './components/HelpDropdown.vue'

</script>

<style scoped lang="scss">
.toolbar-content {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 20px;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e4e7ed;
  margin: 0 10px;
}

.status-info {
  margin-left: auto;
  color: #606266;
  font-size: 14px;
}
</style>