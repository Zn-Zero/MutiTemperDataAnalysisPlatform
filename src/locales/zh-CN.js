import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
	windowTitle: '多温度数据分析平台',
	components: {
		dialog: {
			channel: {
				title: '通道设置',
				channel_name: '通道名称',
				channel_name_placeholder: '请输入通道名称',
				sensor_type: '传感器类型',
				sensor_type_placeholder: '选择类型',
				sensor_model: '传感器型号',
				sensor_model_placeholder: '请输入型号',
				sensor_serial: '传感器序列号',
				sensor_serial_placeholder: '请输入序列号',
				unit: '单位',
				unit_placeholder: '选择单位',
				high_limit: '高限报警值',
				low_limit: '低限报警值',
				extreme_max: '极限最大值',
				extreme_min: '极限最小值',
				color: '颜色',
				enabled: '启用',
				visible: '可见',
				alarm_history: '报警历史',
				alarm_history_placeholder: '无',
				cancel: '取消',
				save: '保存',
				batch: {
					title: '通道设置',
					no_channel_name_change: '批量修改不会修改通道名称',
					sensor_type: '传感器类型',
					sensor_type_placeholder: '选择类型',
					unit: '单位',
					unit_placeholder: '选择单位',
					sensor_model: '传感器型号',
					sensor_model_placeholder: '可选',
					sensor_serial: '传感器序列号',
					sensor_serial_placeholder: '可选',
					high_limit: '高限报警值',
					low_limit: '低限报警值',
					extreme_max: '极限最大值',
					extreme_min: '极限最小值',
					enabled: '启用',
					visible: '可见',
					color: '颜色',
					cancel: '取消',
					apply: '应用'
				}
			},
			instrument: {
				index: {
					basic_settings: '基础设置',
					channel_custom_settings: '通道个性化设置',
					product_id: '产品标识'
				},
				baseinfoform: {
					instrument_port: '仪器端口',
					select_port: '请选择端口',
					baud_rate: '波特率',
					select_baud_rate: '请选择波特率',
					instrument_type: '仪器型号',
					enter_instrument_type: '请输入仪器型号',
					instrument_name: '仪器名称',
					enter_instrument_name: '请输入仪器名称',
					instrument_address: '仪器地址',
					enter_instrument_address: '请输入仪器地址',
					channel_amount: '通道总数',
					select_channel_amount: '请选择通道总数',
					interval: '采集间隔',
					enter_interval: '请输入采集间隔',
					seconds: '秒',
					duration: '持续时间',
					enter_duration: '请输入持续时间',
					hours: '小时',
					begin_channel: '起始通道',
					select_begin_channel: '请选择起始通道',
					warning_sound: '告警声音',
					select_warning_sound: '请选择告警声音',
					save_config: '保存配置'
				},
				costumsetting: {
					show_channel: '显示通道',
					channel_01_08: '01~08 通道',
					channel_09_16: '09~16 通道',
					channel_17_24: '17~24 通道',
					channel_25_32: '25~32 通道',
					channel_33_40: '33~40 通道',
					channel_41_48: '41~48 通道',
					channel_49_56: '49~56 通道',
					channel_57_64: '57~64 通道',
					channel_one: '通道一',
					channel_two: '通道二',
					save_config: '保存配置'
				},
				prodinfo: {
					manufacturer: '生产厂家',
					enter_manufacturer: '请输入生产厂家',
					product_type: '产品类型',
					enter_product_type: '请输入产品类型',
					product_no: '产品编号',
					enter_product_no: '请输入产品编号',
					operator: '操作人员',
					enter_operator: '请输入操作人员',
					add_watermark: '添加水印',
					add_header: '添加页眉',
					company_name: '公司名称',
					enter_company_name: '请输入公司名称',
					company_phone: '公司电话',
					enter_company_phone: '请输入公司电话',
					company_fax: '公司传真',
					enter_company_fax: '请输入公司传真',
					company_website: '公司网址',
					enter_company_website: '请输入公司网址',
					company_address: '公司地址',
					enter_company_address: '请输入公司地址',
					logo_path: 'logo路径',
					enter_logo_path: '请输入logo路径',
					save_config: '保存配置'
				}
			},
			language: {
				title: '语言设置',
				current: '当前语言：',
				changing: '正在切换语言，请稍候...',
				zh_cn: '简体中文',
				en_us: 'English'
			}
		},
		layout: {
			sidebar: {
				instrument_management: '仪器管理',
				feature_in_development: '功能开发中',
				instrument: '仪器',
				view: '查看',
				edit: '编辑',
				delete: '删除'
			},
			footer: {
				copyright: '多路温度数据分析平台 © 2026 温州桃梓仪器仪表有限公司 保留所有权利 【版本号：V0.1.0】 更新日期：2026-01-01'
			},
			toolbar: {
				menudropdown: {
					menu: '菜单',
					add_instrument: '添加仪器',
					return_home: '返回首页',
					fullscreen: '全屏',
					exit_fullscreen: '退出全屏',
					exit: '退出',
					confirm_exit: '确定要退出应用吗?',
					confirm: '确定',
					cancel: '取消'
				},
				communicationdropdown: {
					communication: '通讯',
					start: '开始',
					stop: '停止',
					screen_calibration: '屏幕校准',
					start_feature_in_development: '开始采集功能开发中',
					stop_feature_in_development: '停止采集功能开发中',
					confirm: '确定'
				},
				datadropdown: {
					data: '数据',
					line: '曲线',
					bar: '柱状',
					table: '列表',
					history: '历史数据',
					import: '导入数据',
					history_feature_in_development: '历史数据功能开发中',
					import_feature_in_development: '导入数据功能开发中',
					confirm: '确定'
				},
				settingsdropdown: {
					settings: '设置',
					print_settings: '打印设置',
					set_language: '设置语言',
					print_feature_in_development: '打印设置功能开发中',
					confirm: '确定'
				},
				helpdropdown: {
					help: '帮助',
					qr_code: '二维码',
					about: '关于',
					qr_feature_in_development: '二维码功能开发中',
					about_feature_in_development: '关于功能开发中',
					confirm: '确定'
				}
			}
		},
		backbtn: {},
		contextmenu: {},
		validsignal: {}
	},
	router: {},
	stores: {
		instrument: {
			not_found_instrument: '未找到仪器: {insName}',
			not_found_channel: '未找到通道: {channelId} 在仪器: {insName} 中',
			save_error: '保存数据时出错',
			load_error: '加载数据时出错',
			test_name_current: '多路温度测试仪_cur',
			test_name_1: '多路温度测试仪1',
			test_name_2: '多路温度测试仪2'
		},
		instrumentformconfig: {
			channel_amount_label: '{count}路',
			warning_sound1: '蜂鸣音1',
			warning_sound2: '蜂鸣音2',
			warning_voice: '语音告警',
			channel_name: '通道{index}'
		}
	},
	utils: {
		index: {},
		crc16: {}
	},
	view: {
		dataview: {
			databar: {
				title: '仪表图'
			},
			datagrid: {
				title: '仪表图',
				copylink_failed: '复制通道链接失败,请稍后重试',
				copylink: '将链接复制到剪贴板',
				editchannel: '修改通道信息',
				batchedit: '批量修改',
				max_label: 'Max:',
				min_label: 'Min:',
				avg_label: 'Ave:'
			},
			datalayout: {
				title: '仪表图',
				all: '全部',
				channel_select_placeholder: '通道选择',
				shrink: '缩小',
				expand: '放大'
			},
			dataline: {
				title: '仪表图'
			},
			datatable: {
				title: '仪表图'
			}
		},
		homeview: {
			welcome: '欢迎使用多路温度数据分析平台',
			packaged: '（已打包）',
			dev: '（开发模式）',
			port_test: '端口测试',
			csv_test: 'csv测试'
		}
	},
	app: {},
	elLocale: zhCn
}