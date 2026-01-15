// electron-main/index.js
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { initSerialIpc } from './serial.js'
import { initExcelIpc } from './excel.js'

const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filenameNew)


// 监听渲染进程方法
ipcMain.on("window-new", (e, data) => {
  console.log('ipcMain.on("window-new")',data);
});

const createWindow = () => {
  const win = new BrowserWindow({
    title: '多路温度数据分析',
    // frame: false,
    autoHideMenuBar: true,
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirnameNew, "../electron-preload/index.js"), // 需要引用js文件
    },
  });

  // win.webContents.openDevTools()
  initSerialIpc(win); // 初始化串口IPC
  initExcelIpc(win); // 初始化文件IPC
  
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirnameNew, "../index.html"));
  } else {
    let url = "http://localhost:5173/"; // 本地启动的vue项目路径
    win.loadURL(url);
  }
};


app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


