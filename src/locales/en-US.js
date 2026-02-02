import enUs from 'element-plus/es/locale/lang/en'

export default {
  windowTitle: 'Multi-Temperature Data Analysis Platform',
  components: {
    dialog: {
      channel: {
        title: 'Channel Settings',
        channel_name: 'Channel Name',
        channel_name_placeholder: 'Enter channel name',
        sensor_type: 'Sensor Type',
        sensor_type_placeholder: 'Select type',
        sensor_model: 'Sensor Model',
        sensor_model_placeholder: 'Enter model',
        sensor_serial: 'Sensor Serial',
        sensor_serial_placeholder: 'Enter serial',
        unit: 'Unit',
        unit_placeholder: 'Select unit',
        high_limit: 'High Limit',
        low_limit: 'Low Limit',
        extreme_max: 'Extreme Max',
        extreme_min: 'Extreme Min',
        color: 'Color',
        enabled: 'Enabled',
        visible: 'Visible',
        alarm_history: 'Alarm History',
        alarm_history_placeholder: 'None',
        cancel: 'Cancel',
        save: 'Save',
        batch: {
          title: 'Channel Settings',
          no_channel_name_change: 'Batch edit will not change channel names',
          sensor_type: 'Sensor Type',
          sensor_type_placeholder: 'Select type',
          unit: 'Unit',
          unit_placeholder: 'Select unit',
          sensor_model: 'Sensor Model',
          sensor_model_placeholder: 'Optional',
          sensor_serial: 'Sensor Serial',
          sensor_serial_placeholder: 'Optional',
          high_limit: 'High Limit',
          low_limit: 'Low Limit',
          extreme_max: 'Extreme Max',
          extreme_min: 'Extreme Min',
          enabled: 'Enabled',
          visible: 'Visible',
          color: 'Color',
          cancel: 'Cancel',
          apply: 'Apply'
        }
      },

      instrument: {
        index: {
          basic_settings: 'Basic Settings',
          channel_custom_settings: 'Channel Custom Settings',
          product_id: 'Product ID'
        },
        baseinfoform: {
          instrument_port: 'Instrument Port',
          select_port: 'Select port',
          baud_rate: 'Baud Rate',
          select_baud_rate: 'Select baud rate',
          instrument_type: 'Instrument Type',
          enter_instrument_type: 'Enter instrument type',
          instrument_name: 'Instrument Name',
          enter_instrument_name: 'Enter instrument name',
          instrument_address: 'Instrument Address',
          enter_instrument_address: 'Enter instrument address',
          channel_amount: 'Channel Amount',
          select_channel_amount: 'Select channel amount',
          interval: 'Interval',
          enter_interval: 'Enter interval',
          seconds: 'seconds',
          duration: 'Duration',
          enter_duration: 'Enter duration',
          hours: 'hours',
          begin_channel: 'Begin Channel',
          select_begin_channel: 'Select begin channel',
          warning_sound: 'Warning Sound',
          select_warning_sound: 'Select warning sound',
          save_config: 'Save Config'
        },
        costumsetting: {
          show_channel: 'Show Channel',
          channel_01_08: '01~08 Channels',
          channel_09_16: '09~16 Channels',
          channel_17_24: '17~24 Channels',
          channel_25_32: '25~32 Channels',
          channel_33_40: '33~40 Channels',
          channel_41_48: '41~48 Channels',
          channel_49_56: '49~56 Channels',
          channel_57_64: '57~64 Channels',
          channel_one: 'Channel 1',
          channel_two: 'Channel 2',
          save_config: 'Save Config'
        },
        prodinfo: {
          manufacturer: 'Manufacturer',
          enter_manufacturer: 'Enter manufacturer',
          product_type: 'Product Type',
          enter_product_type: 'Enter product type',
          product_no: 'Product No.',
          enter_product_no: 'Enter product no.',
          operator: 'Operator',
          enter_operator: 'Enter operator',
          add_watermark: 'Add Watermark',
          add_header: 'Add Header',
          company_name: 'Company Name',
          enter_company_name: 'Enter company name',
          company_phone: 'Company Phone',
          enter_company_phone: 'Enter company phone',
          company_fax: 'Company Fax',
          enter_company_fax: 'Enter company fax',
          company_website: 'Company Website',
          enter_company_website: 'Enter company website',
          company_address: 'Company Address',
          enter_company_address: 'Enter company address',
          logo_path: 'Logo Path',
          enter_logo_path: 'Enter logo path',
          save_config: 'Save Config'
        }
      },

      language: {
        title: 'Language Settings',
        current: 'Current language: ',
        changing: 'Changing language, please wait...',
        zh_cn: '简体中文',
        en_us: 'English'
      },
    },

    layout: {
      sidebar: {
        instrument_management: 'Instrument Management',
        feature_in_development: 'Feature in development',
        instrument: 'Instrument',
        view: 'View',
        edit: 'Edit',
        delete: 'Delete'
      },
      footer: {
        copyright: 'Multi-Temperature Data Analysis Platform © 2026 Wenzhou Taozi Instrument Co., Ltd. All rights reserved  [Version: V0.1.0]  Updated: 2026-01-01'
      },
      toolbar: {
        menudropdown: {
          menu: 'Menu',
          add_instrument: 'Add Instrument',
          return_home: 'Return Home',
          fullscreen: 'Fullscreen',
          exit_fullscreen: 'Exit Fullscreen',
          exit: 'Exit',
          confirm_exit: 'Are you sure you want to exit?',
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        communicationdropdown: {
          communication: 'Communication',
          start: 'Start',
          stop: 'Stop',
          screen_calibration: 'Screen Calibration',
          start_feature_in_development: 'Start collection feature in development',
          stop_feature_in_development: 'Stop collection feature in development',
          confirm: 'Confirm'
        },
        datadropdown: {
          data: 'Data',
          line: 'Line',
          bar: 'Bar',
          table: 'Table',
          history: 'History Data',
          import: 'Import Data',
          history_feature_in_development: 'History data feature in development',
          import_feature_in_development: 'Import data feature in development',
          confirm: 'Confirm'
        },
        settingsdropdown: {
          settings: 'Settings',
          print_settings: 'Print Settings',
          set_language: 'Set Language',
          print_feature_in_development: 'Print settings feature in development',
          confirm: 'Confirm'
        },
        helpdropdown: {
          help: 'Help',
          qr_code: 'QR Code',
          about: 'About',
          qr_feature_in_development: 'QR code feature in development',
          about_feature_in_development: 'About feature in development',
          confirm: 'Confirm'
        }
      }
    },

    backbtn: {},
    contextmenu: {},
    validsignal: {},
  },

  router: {},

  stores: {
    instrument: {
      not_found_instrument: 'Instrument not found: {insName}',
      not_found_channel: 'Channel not found: {channelId} in instrument: {insName}',
      save_error: 'Error saving data',
      load_error: 'Error loading data',
      test_name_current: 'Multi-Channel Temp Tester_cur',
      test_name_1: 'Multi-Channel Temp Tester 1',
      test_name_2: 'Multi-Channel Temp Tester 2'
    },
    instrumentformconfig: {
      channel_amount_label: '{count}CH',
      warning_sound1: 'Buzzer 1',
      warning_sound2: 'Buzzer 2',
      warning_voice: 'Voice Alarm',
      channel_name: 'Channel {index}'
    },
  },

  utils: {
    index: {},
    crc16: {},
  },

  view: {
    dataview: {
      databar: {
        title: 'Gauge'
      },
      datagrid: {
        title: 'Gauge',
        copylink_failed: 'Failed to copy channel link, please try again later',
        copylink: 'Copy link to clipboard',
        editchannel: 'Edit channel info',
        batchedit: 'Batch edit',
        max_label: 'Max:',
        min_label: 'Min:',
        avg_label: 'Ave:'
      },
      datalayout: {
        title: 'Gauge',
        all: 'All',
        channel_select_placeholder: 'Select channels',
        shrink: 'Shrink',
        expand: 'Expand'
      },
      dataline: {
        title: 'Gauge'
      },
      datatable: {
        title: 'Gauge'
      },
    },
    homeview: {
      welcome: 'Welcome to Multi-Channel Temperature Data Analysis Platform',
      packaged: '(Packaged)',
      dev: '(Development Mode)',
      port_test: 'Port Test',
      csv_test: 'CSV Test'
    },
  },

  app: {},

  elLocale: enUs
}
