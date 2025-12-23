/**
 * crc16.js - ESM格式的16位CRC校验（低字节在前）
 * 支持CRC-16/Modbus、CRC-16/CCITT(XModem)，输出低字节在前的结果
 * 兼容Node.js/浏览器环境
 */

/**
 * 辅助：反转8位字节（输入反射用）
 * @param {number} byte - 8位字节
 * @returns {number} 反转后的字节
 */
export function reflect8(byte) {
  let res = 0;
  for (let i = 0; i < 8; i++) {
    res = (res << 1) | (byte & 1);
    byte >>= 1;
  }
  return res & 0xFF;
}

/**
 * 辅助：反转16位数值（输出反射用）
 * @param {number} value - 16位数值
 * @returns {number} 反转后的数值
 */
export function reflect16(value) {
  let res = 0;
  for (let i = 0; i < 16; i++) {
    res = (res << 1) | (value & 1);
    value >>= 1;
  }
  return res & 0xFFFF;
}

/**
 * 通用16位CRC校验码生成函数
 * @param {Uint8Array|number[]|string} data - 输入数据（字节数组/字符串）
 * @param {object} options - CRC配置参数
 * @param {number} options.polynomial - 多项式（如 0x8005/0x1021）
 * @param {number} options.init - 初始值（如 0xFFFF/0x0000）
 * @param {boolean} options.reflectIn - 输入字节是否反射（低位在前）
 * @param {boolean} options.reflectOut - 输出结果是否反射
 * @param {number} options.xorOut - 结果异或值（如 0x0000/0xFFFF）
 * @returns {number} 16位CRC校验码（十进制）
 */
export function crc16(data, options) {
  // 默认参数（CRC-16/Modbus）
  const opts = {
    polynomial: 0x8005,
    init: 0xFFFF,
    reflectIn: true,
    reflectOut: true,
    xorOut: 0x0000,
    ...options
  };

  // 处理输入：字符串转字节数组（UTF-8）
  let bytes = data;
  if (typeof data === 'string') {
    bytes = new TextEncoder().encode(data);
  } else if (Array.isArray(data)) {
    bytes = new Uint8Array(data);
  }

  let crc = opts.init;

  // 遍历每个字节
  for (let byte of bytes) {
    // 输入反射：反转字节的8位
    if (opts.reflectIn) {
      byte = reflect8(byte);
    }

    // CRC寄存器与当前字节异或
    crc ^= (byte & 0xFF) << 8;

    // 循环8次移位
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ opts.polynomial;
      } else {
        crc = crc << 1;
      }
      // 限制为16位
      crc &= 0xFFFF;
    }
  }

  // 输出反射：反转16位结果
  if (opts.reflectOut) {
    crc = reflect16(crc);
  }

  // 结果异或
  crc ^= opts.xorOut;

  return crc & 0xFFFF; // 确保结果为16位
}

/**
 * CRC-16/Modbus 生成 + 低字节在前处理（工业串口常用）
 * @param {Uint8Array|number[]|string} data - 输入数据
 * @returns {object} { crc: 十进制CRC值, lowByte: 低字节, highByte: 高字节, bytes: 低字节在前的字节数组, hex: 十六进制字符串 }
 */
export function crc16ModbusLittleEndian(data) {
  // 生成标准CRC16值
  const crc = crc16(data, {
    polynomial: 0x8005,
    init: 0xFFFF,
    reflectIn: true,
    reflectOut: true,
    xorOut: 0x0000
  });

  // 拆分低/高字节（低字节在前）
  const lowByte = crc & 0xFF;    // 低8位
  const highByte = (crc >> 8) & 0xFF; // 高8位

  return {
    crc: crc,
    lowByte: lowByte,
    highByte: highByte,
    bytes: [lowByte, highByte],
    hex: (
      lowByte.toString(16).padStart(2, '0') +
      highByte.toString(16).padStart(2, '0')
    ).toUpperCase()
  };
}

/**
 * CRC-16/CCITT(XModem) 生成 + 低字节在前处理
 * @param {Uint8Array|number[]|string} data - 输入数据
 * @returns {object} { crc: 十进制CRC值, lowByte: 低字节, highByte: 高字节, bytes: 低字节在前的字节数组, hex: 十六进制字符串 }
 */
export function crc16CCITTLittleEndian(data) {
  const crc = crc16(data, {
    polynomial: 0x1021,
    init: 0x0000,
    reflectIn: false,
    reflectOut: false,
    xorOut: 0x0000
  });

  const lowByte = crc & 0xFF;
  const highByte = (crc >> 8) & 0xFF;

  return {
    crc: crc,
    lowByte: lowByte,
    highByte: highByte,
    bytes: [lowByte, highByte],
    hex: (
      lowByte.toString(16).padStart(2, '0') +
      highByte.toString(16).padStart(2, '0')
    ).toUpperCase()
  };
}

export function createCRCData(data) {
    // 原始数据：Modbus读寄存器指令 [地址01, 功能码03, 起始地址00 00, 寄存器数量00 01]

    // 生成低字节在前的CRC
    const crcResult = crc16ModbusLittleEndian(data);
    // console.log('完整CRC值（十进制）：', crcResult.crc); // 输出：43981（对应十六进制 0x840A）
    // console.log('低字节：', crcResult.lowByte); // 0x0A → 十进制10
    // console.log('高字节：', crcResult.highByte); // 0x84 → 十进制132
    // console.log('低字节在前的字节数组：', crcResult.bytes); // [10, 132] → [0x0A, 0x84]
    // console.log('低字节在前的十六进制：', crcResult.hex); // "0A84"（Modbus协议最终拼接格式）

    // 拼接原数据 + CRC（低字节在前）→ 完整发送帧
    const sendData = [...data, ...crcResult.bytes];
    console.log('sendData: ' + sendData);
    return sendData;
    // console.log('完整发送帧：', sendData); // [1,3,0,0,0,1,10,132]
}