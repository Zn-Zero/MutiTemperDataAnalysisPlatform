import { ipcMain, dialog } from 'electron'
import fs from 'fs/promises'
import iconv from 'iconv-lite'
import path from 'path'

export function initFileIpc(mainWindow) {
  // 1. 文件选择对话框（主进程处理，避免渲染进程权限问题）
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '选择CSV文件',
      filters: [
        { name: 'Excel文件', extensions: ['csv', 'xlsx', 'xls'] },
        { name: '所有文件', extensions: ['*'] }
      ],
      properties: ['openFile']
    })
    return result
  })

  // 2. 异步文件读取（核心：非阻塞+编码识别）
  ipcMain.handle('read-file', async (_, filePath) => {
    console.log('Reading file at path:', filePath)
    try {
      // 异步读取文件缓冲区（非阻塞）
      const buffer = await fs.readFile(filePath)
      let content = ''
      let encoding = 'gbk'

      // 智能编码识别（优先适配您的GBK文件）
      // The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
      try {
        content = iconv.decode(buffer, 'gbk')
      } catch (e) {
        try {
          content = iconv.decode(buffer, 'utf8') // 您的文件使用此编码
          encoding = 'utf8'
        } catch (e2) {
          content = iconv.decode(buffer, 'gb2312')
          encoding = 'gb2312'
        }
      }

      return {
        success: true,
        content,
        encoding,
        fileName: path.basename(filePath),
        filePath
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })
}