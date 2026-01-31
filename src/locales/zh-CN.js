import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
  windowTitle: '多温度数据分析平台',
  components: {
    dialog: {
      channel: {

        batch: {},
      },

      instrument: {

        components: {
          baseinfoform: {},
          customsetting: {},
          prodinfo: {},
        }
      },

      language: {
        title: '语言设置',
        current: '当前语言：',
        changing: '正在切换语言，请稍候...'
      },
    },

    layout: {
      toolbar: {

        components: {
          communicationdropdown: {},
          datadropdown: {},
          helpdropdown: {},
          menudropdown: {},
          settingsdropdown: {},
        }
      },
      footer: {},
      mainlayout: {},
      sidebar: {},
    },

    backbtn: {},
    contextmenu: {},
    validsignal: {},
  },

  router: {},

  stores: {
    instrument: {},
    instrumentformconfig: {},
  },

  utils: {
    index: {},
    crc16: {},
  },

  view: {
    dataview: {
      databar: {},
      datagrid: {},
      datalayout: {},
      dataline: {},
      datatable: {},
    },
    homeview: {},
  },

  app: {},
  
  // Element Plus 语言包（需透传给组件）
  elLocale: zhCn
}
// 串口 {name} 打开失败