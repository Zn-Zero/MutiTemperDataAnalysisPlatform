import { app, ipcMain, dialog } from 'electron'
import os from 'os'

export function initOsIpc(mainWindow) {
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

  // 显示操作系统信息
  ipcMain.handle('window:env', async () => {
    return {
      platform: process.platform,
      version: app.getVersion(),
      memory: process.getSystemMemoryInfo(),
      path: app.getPath('userData'),
      isPackaged: app.isPackaged
    };
  });
}