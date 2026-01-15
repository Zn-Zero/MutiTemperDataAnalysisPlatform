/**
 * 将数字索引对象转换为十六进制空格分隔的字符串
 * @param {Object} dataObj - 数字索引的对象（如{0:1,1:3,...6:135}）
 * @returns {string} 格式化后的十六进制字符串（如"01 03 02 00 04 B9 87"）
 */
export function convertToHexString(dataObj) {
  // 1. 提取对象的键并转为数字，按升序排序（确保0→1→2...顺序）
  const sortedKeys = Object.keys(dataObj)
    .map(key => Number(key)) // 转数字（避免键是字符串"0"/"1"的问题）
    .sort((a, b) => a - b);  // 升序排序

  // 2. 遍历排序后的键，将每个值转为两位十六进制（补零+大写）
  const hexArray = sortedKeys.map(key => {
    const decimalValue = dataObj[key];
    // 校验值的范围（串口数据通常是0-255，可选）
    if (decimalValue < 0 || decimalValue > 255) {
      throw new Error(`值 ${decimalValue} 超出0-255范围（串口单字节限制）`);
    }
    // 转十六进制 + 补前导零（不足两位） + 转大写
    return decimalValue.toString(16).padStart(2, '0').toUpperCase();
  });

  // 3. 用空格拼接成最终字符串
  return hexArray.join(' ');
}

/**
 * 【Promise版】解析输入字符串（十进制/十六进制）为单字节数值数组
 * @param {string} input - 输入内容（如：十进制"1 3 2 0 4 185 135" | 十六进制"01 03 02,00，04-B9 87"）
 * @param {Object} options - 配置项
 * @param {'decimal' | 'hex' | 'auto'} [options.inputType='auto'] - 输入类型：decimal(十进制)、hex(十六进制)、auto(自动识别)
 * @param {boolean} [options.checkSingleByte=true] - 是否校验单字节范围（0-255，默认true）
 * @returns {Promise<number[]>} 成功resolve十进制数值数组（如[1,3,2,0,4,185,135]），失败reject错误信息
 */
export function parseInputToByteArray(input, options = {}) {
  const { inputType = 'auto', checkSingleByte = true } = options;

  return new Promise((resolve, reject) => {
    // 1. 基础校验：输入为空
    if (!input || input.trim() === '') {
      reject(new Error('输入内容不能为空'));
      return;
    }

    // 2. 清洗输入：去除首尾空白，按多分隔符分割（空格/中英文逗号/短横线）
    const cleanedInput = input.trim();
    const separatorRegex = /[\s,，-]+/;
    const inputItems = cleanedInput.split(separatorRegex).filter(item => item !== '');

    // 3. 无有效元素
    if (inputItems.length === 0) {
      reject(new Error('输入内容仅包含分隔符，无有效数据'));
      return;
    }

    // 4. 定义校验/转换规则
    const hexValidRegex = /^[0-9a-fA-F]{1,2}$/; // 1-2位十六进制正则
    const byteArray = [];

    // 5. 遍历解析每个元素
    for (let i = 0; i < inputItems.length; i++) {
      const item = inputItems[i];
      const index = i + 1; // 提示用户的序号（从1开始）
      let num;

      // 5.1 自动识别输入类型（仅inputType为auto时）
      let actualType = inputType;
      if (actualType === 'auto') {
        actualType = hexValidRegex.test(item) ? 'hex' : 'decimal';
      }

      // 5.2 按类型解析 + 合法性校验
      try {
        if (actualType === 'hex') {
          // 十六进制解析
          num = parseInt(item, 16);
          // 十六进制格式二次校验（防止parse容错导致的异常）
          if (isNaN(num)) {
            throw new Error(`不是合法的十六进制字符`);
          }
        } else if (actualType === 'decimal') {
          // 十进制解析
          num = parseInt(item, 10);
          // 十进制格式校验（是否为纯数字）
          if (isNaN(num) || !/^\d+$/.test(item)) {
            throw new Error(`不是合法的十进制数字`);
          }
        }
      } catch (parseErr) {
        reject(new Error(`第${index}个元素「${item}」解析失败：${parseErr.message}（当前按${actualType}解析）`));
        return;
      }

      // 5.3 单字节范围校验（0-255）
      if (checkSingleByte && (num < 0 || num > 255)) {
        reject(new Error(`第${index}个元素「${item}」超出范围：仅支持单字节（十进制0-255，对应十六进制00-FF）`));
        return;
      }

      // 5.4 合法数据加入数组
      byteArray.push(num);
    }

    // 6. 全部解析成功，返回数值数组
    resolve(byteArray);
  });
}

/**
 * 判断值是否为空白
 * @param {*} value - 要检查的值
 * @returns {boolean} - 如果值为空白则返回 true，否则返回 false
 */
export function isBlank(value) {
  // 检查是否为 null 或 undefined
  if (value === null || value === undefined) {
    return true;
  }
  
  // 检查是否为字符串类型，如果是则去除首尾空白后判断长度
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  
  // 检查是否为数组类型，如果是则判断长度
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  // 对于其他类型，转换为字符串后判断
  return String(value).trim().length === 0;
}
