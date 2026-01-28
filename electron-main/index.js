// electron-main/index.js（完整修改后代码）
import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { initSerialIpc } from './serial.js'
import { initExcelIpc } from './excel.js'
import { initFileIpc } from './file.js'
import { initOsIpc } from './os.js'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)

const createWindow = () => {
  const win = new BrowserWindow({
    title: '多路温度数据分析',
    autoHideMenuBar: true,
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true, // 必须保持开启（安全隔离）
      nodeIntegration: false, // 关闭Node API（开启contextIsolation后建议禁用，避免安全风险）
      preload: path.join(__dirnameNew, "../electron-preload/index.js"),
      // 关键：添加安全的CSP规则
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"], // 仅允许自身资源
          scriptSrc: ["'self'"], // 仅允许自身脚本
          styleSrc: ["'self'", "'unsafe-inline'"], // 允许内联样式（Vue/Element Plus 需用到）
          imgSrc: ["'self'", "data:"], // 允许自身图片和base64图片
          connectSrc: ["'self'", "http://localhost:5173"], // 开发环境允许本地Vue服务
          fontSrc: ["'self'"],
          objectSrc: ["'none'"], // 禁止object标签（减少风险）
          upgradeInsecureRequests: [], // 自动升级http到https
        },
      },
    },
  });

  initSerialIpc(win);
  initExcelIpc(win);
  initFileIpc(win);
  initOsIpc(win);
  
  if (app.isPackaged) {
    win.loadFile(path.join(__dirnameNew, "../index.html"));
  } else {
    let url = "http://localhost:5173/";
    win.loadURL(url);
  }
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});