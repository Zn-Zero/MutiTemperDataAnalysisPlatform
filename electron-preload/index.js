// electron-preload/index.js
const { contextBridge, ipcRenderer } = require('electron');

// 存储监听回调（避免重复绑定、方便移除）
const listeners = {
  data: [],
  error: [],
  closed: []
};

// 封装监听逻辑（通用方法）
function _on(eventName, callback) {
  // 避免重复添加相同回调
  if (!listeners[eventName].includes(callback)) {
    listeners[eventName].push(callback);
  }
  // 绑定ipcRenderer监听，触发时执行所有回调
  ipcRenderer.on('serial:' + eventName, (_, data) => {
    listeners[eventName].forEach(cb => cb(data));
  });
}

// 封装移除监听逻辑
function _off(eventName, callback) {
  // 移除指定回调
  listeners[eventName] = listeners[eventName].filter(cb => cb !== callback);
  // 如果无回调，移除ipcRenderer监听（减少内存占用）
  if (listeners[eventName].length === 0) {
    ipcRenderer.removeAllListeners('serial:' + eventName);
  }
}

// 暴露给渲染进程的安全API
contextBridge.exposeInMainWorld('serialApi', {
  // 基础方法（list/open/write/close等）
  list: () => ipcRenderer.invoke('serial:list'),
  open: (options) => ipcRenderer.invoke('serial:open', options),
  write: (data, encoding) => ipcRenderer.invoke('serial:write', data, encoding),
  close: () => ipcRenderer.invoke('serial:close'),

  // 数据监听方法（核心）
  onData: (callback) => _on('data', callback), // 监听数据
  onError: (callback) => _on('error', callback), // 监听错误
  onClosed: (callback) => _on('closed', callback), // 监听关闭

  // 移除监听（必须！防止内存泄漏）
  offData: (callback) => _off('data', callback),
  offError: (callback) => _off('error', callback),
  offClosed: (callback) => _off('closed', callback),

  // 移除所有监听（便捷方法）
  removeAllListeners: () => {
    // 仅移除通过 _on 注册的 serial 相关事件监听器
    ['data', 'error', 'closed'].forEach(event => {
      const fullEventName = `serial:${event}`;
      ipcRenderer.removeAllListeners(fullEventName);
      if (listeners[event]) {
        listeners[event] = [];
      }
    });
  }
});

contextBridge.exposeInMainWorld('excelApi', {
  selectExcel: () => ipcRenderer.invoke('select-file'),
  readExcel: (filePath) => ipcRenderer.invoke('read-file', filePath)
})

contextBridge.exposeInMainWorld('fileApi', {
  saveData: (data, filePath) => ipcRenderer.invoke('persist:save', data, filePath),
  readFile: (filePath) => ipcRenderer.invoke('persist:read', filePath)
})

contextBridge.exposeInMainWorld('osApi', {
  platform: () => ipcRenderer.invoke('window:platform'),
  close: () => ipcRenderer.invoke('window:close'),
  isFullScreen: () => ipcRenderer.invoke('window:isfullscreen'),
  fullScreen: () => ipcRenderer.invoke('window:fullscreen'),
  exitFullScreen: () => ipcRenderer.invoke('window:exitfullscreen'),
  sysmsg: (msg, type, title) => ipcRenderer.invoke('window:sysmsg', msg, type, title),
  openFile: (options) => ipcRenderer.invoke('window:openfile', options),
  saveFile: (options) => ipcRenderer.invoke('window:savefile', options)
});
