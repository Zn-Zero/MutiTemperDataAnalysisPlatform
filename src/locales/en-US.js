import enUs from 'element-plus/es/locale/lang/en'

export default {
  windowTitle: 'Multi-Temperature Data Analysis Platform',
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
        title: 'language settings',
        current: 'current language: ',
        changing: 'Changing language, please wait...'
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

  elLocale: enUs
}
