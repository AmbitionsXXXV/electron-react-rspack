import { BrowserWindow } from 'electron'

declare const MAIN_WINDOW_PRELOAD_RSPACK_ENTRY: string

let mainWindow: any = null

function createWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    frame: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_RSPACK_ENTRY,
      nodeIntegration: true,
      webSecurity: false // 禁用同源策略
    }
  })

  return mainWindow
}

function getWindow(): BrowserWindow {
  return mainWindow
}

export default {
  createWindow,
  getWindow
}
