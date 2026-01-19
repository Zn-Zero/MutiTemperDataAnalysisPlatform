import { app, ipcMain } from 'electron'
import fs from 'fs/promises'
import path from 'path'

// todo 存在多个文件，用于存储不同数据
const filePath ={
  data: path.join(app.getPath('userData'), 'historical-data.json'), // 存储历史数据的文件路径
  config: path.join(app.getPath('userData'), 'user-config.json')    // 存储用户配置的文件路径
}

export function initFileIpc(mainWindow) {
  // 监听：保存持久化数据（渲染进程触发）
  ipcMain.on('persist:save', async (event, data, filePath) => {
  try {
      // 将数据转为JSON字符串写入文件
      await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      // 给渲染进程返回“保存成功”的响应
      event.reply('persist:save-reply', { success: true, message: '数据保存成功' });
    } catch (err) {
      // 可以添加日志记录
      console.error('保存数据失败:', err);
      event.reply('persist:save-reply', { success: false, message: `保存失败: ${err.message}` });
    }
  });

  // 监听：读取持久化数据（渲染进程触发，需要返回数据）
  ipcMain.handle('persist:read', async (filePath) => {
    try {
      // 检查文件是否存在
      if (!await fs.promises.access(filePath, fs.constants.F_OK)) {
        return { success: true, data: {} }; // 文件不存在则返回空对象
      }

      // 读取文件并解析为JSON
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: `读取失败：${err.message}` };
    }
  });
}

