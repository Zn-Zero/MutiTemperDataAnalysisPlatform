// electron/ipcHandlers/serialIpc.js
import { ipcMain, app } from 'electron'
import { SerialPort } from 'serialport'

// 私有变量（仅当前模块可见，避免全局污染）
let _port = null;
let _mainWindow = null;

// 辅助：绑定串口事件（含data监听）
function _bindPortEvents(port) {
  // 1. 监听data事件，推送给渲染进程
  port.on('data', (rawData) => {
    if (!_mainWindow) return;
    // 封装多格式数据（方便渲染进程使用）
    const sendData = {
      raw: rawData, // Buffer原始数据
      string: rawData.toString('utf8'), // 字符串格式
      hex: rawData.toString('hex'), // 十六进制格式
      length: rawData.length // 数据长度
    };
    // 关键：推送给渲染进程
    _mainWindow.webContents.send('serial:data', sendData);
  });

  // 2. 错误监听（可选，也推送给渲染进程）
  port.on('error', (err) => {
    if (!_mainWindow) return;
    _mainWindow.webContents.send('serial:error', err.message);
  });

  // 3. 关闭事件
  port.on('close', () => {
    _port = null;
    _mainWindow?.webContents.send('serial:closed', '串口已关闭');
  });
}

// 封装所有串口IPC方法
export function initSerialIpc(mainWindow) {
  // 保存主窗口引用（用于向渲染进程推送数据）
  _mainWindow = mainWindow;

  // 1. 获取串口列表
  ipcMain.handle('serial:list', async () => {
    try {
      const ports = await SerialPort.list();
      return ports.map(p => ({
        path: p.path,
        manufacturer: p.manufacturer || '未知厂商',
        productId: p.productId,
        vendorId: p.vendorId
      }));
    } catch (err) {
      throw new Error(`获取串口列表失败：${err.message}`);
    }
  });

  // 2. 打开串口
  ipcMain.handle('serial:open', async (_, options) => {
    // 先关闭已打开的串口
    if (_port) await ipcMain.handle('serial:close')();

    return new Promise((resolve, reject) => {
      _port = new SerialPort({ ...options, autoOpen: false });

      _port.on('open', () => {
        // 绑定错误监听
        _bindPortEvents(_port);
        // 监听数据并推送给渲染进程
        _port.on('data', (data) => {
          console.log('Received data:', data);
          _mainWindow?.webContents.send('serial:data', {
            raw: data,
            string: data.toString('utf8'),
            hex: data.toString('hex')
          });
        });
        resolve(`串口 ${options.path} 打开成功`);
      });

      _port.open((err) => {
        if (err) reject(`打开串口失败：${err.message}`);
      });
    });
  });

  // 3. 写入数据
  ipcMain.handle('serial:write', async (_, data, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
      if (!_port) reject('串口未打开');

      // 修复：新增 Uint8Array 兼容逻辑（核心）
      let writeData;
      if (Buffer.isBuffer(data)) {
        writeData = data;
      } else if (data instanceof Uint8Array) { // 识别 Uint8Array 类型
        writeData = Buffer.from(data); // 转成 Buffer
      } else if (Array.isArray(data)) {
        writeData = Buffer.from(data);
      } else if (typeof data === 'string') {
        writeData = Buffer.from(data, encoding);
      } else {
        reject('写入数据格式不支持（仅支持Buffer/Uint8Array/数组/字符串）');
      }

      _port.write(writeData, (err) => {
        if (err) reject(`写入失败：${err.message}`);
        _port.drain((err) => {
          if (err) console.warn('[数据发送警告]', err.message);
          resolve(`写入 ${writeData.length} 字节数据`);
        });
      });
    });
  });

  // 4. 关闭串口
  ipcMain.handle('serial:close', async () => {
    return new Promise((resolve, reject) => {
      if (!_port) resolve('串口未打开，无需关闭');
      _port.close((err) => {
        if (err) reject(`关闭串口失败：${err.message}`);
        else {
          _port = null;
          resolve('串口已关闭');
        }
      });
    });
  });

  // 5. 清空缓冲区
  ipcMain.handle('serial:flush', async () => {
    return new Promise((resolve, reject) => {
      if (!_port) reject('串口未打开');
      _port.flush((err) => {
        if (err) reject(`清空缓冲区失败：${err.message}`);
        else resolve('缓冲区已清空');
      });
    });
  });

  // 6. 更新串口参数
  ipcMain.handle('serial:set', async (_, options) => {
    return new Promise((resolve, reject) => {
      if (!_port) reject('串口未打开');
      _port.update(options, (err) => {
        if (err) reject(`更新参数失败：${err.message}`);
        else resolve(`参数更新成功：${JSON.stringify(options)}`);
      });
    });
  });

  // 应用退出时自动关闭串口（防止资源占用）
  app.on('before-quit', async () => {
    if (_port) await ipcMain.handle('serial:close')();
  });
}