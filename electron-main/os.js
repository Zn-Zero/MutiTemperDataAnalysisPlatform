import { app, ipcMain, dialog, clipboard } from 'electron'
import os from 'os'
import { updateLocale, t } from './locale.js'

export function initOsIpc(mainWindow) {
  // 显示操作系统信息
  ipcMain.handle('window:env', async () => {
    return {
      platform: process.platform,
      version: app.getVersion(),
      memory: process.getSystemMemoryInfo(),
      path: app.getPath('userData'),
      isPackaged: app.isPackaged,
      locale: app.getLocale()
    };
  });

  // 监听渲染进程的复制请求
  ipcMain.handle('window:clipboard', (e, content) => {
    try {
      // 将内容写入剪贴板（text 格式）
      clipboard.writeText(content)
      return { success: true, message: '复制成功' }
    } catch (error) {
      return { success: false, message: '复制失败：' + error.message }
    }
  })

  // todo 监听渲染进程的语言切换事件
  ipcMain.handle('window:change-locale', (_, locale) => {
    updateLocale(locale);
    // 更新窗口标题
    mainWindow.setTitle(t('windowTitle'));
    // 若有自定义菜单，同步更新菜单文本
    // updateAppMenu(); // 需自己实现菜单更新逻辑
  });

  // todo 应用启动时，读取配置文件获取当前语言。若无配置，则使用系统语言
  ipcMain.handle('window:get-locale', () => {
    updateLocale(app.getLocale() || 'zh-CN');
  });

  // 显示系统消息框
  ipcMain.handle("window:sysmsg", (e, msg, type='info', title='信息') => {
    return dialog.showMessageBoxSync({
      type: type,
      title: title,
      message: msg
    });
  });

  // 显示系统打开文件对话框
  ipcMain.handle("window:openfile", (e, options) => {
    return dialog.showOpenDialogSync(options);
  });

  // 显示系统保存文件对话框
  ipcMain.handle("window:savefile", (e, options) => {
    return dialog.showSaveDialogSync(options);
  });

  
  // 监听渲染进程方法
  ipcMain.handle("window:close", _ => {
    mainWindow.close();
  });

  // 检测全屏状态
  ipcMain.handle("window:isfullscreen", _ => {
    return mainWindow.isFullScreen();
  });

  // 全屏
  ipcMain.handle("window:fullscreen", _ => {
    mainWindow.setFullScreen(true);
  });

  // 退出全屏
  ipcMain.handle("window:exitfullscreen", _ => {
    mainWindow.setFullScreen(false);
  });

  // 最小化窗口
  ipcMain.handle("window:minimize", _ => {
    mainWindow.minimize();
  });

  // 最大化窗口
  ipcMain.handle("window:maximize", _ => {
    mainWindow.maximize();
  });

  // 还原窗口
  ipcMain.handle("window:restore", _ => {
    mainWindow.restore();
  });
}