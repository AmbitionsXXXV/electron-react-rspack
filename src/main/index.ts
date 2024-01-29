import { createWindow } from '@/main/lib/createWindow'
import { isDev } from '@/main/utils/common'
import { isMac } from '@/main/utils/tools'
import { BrowserWindow, Menu, NativeImage, Tray, app, nativeImage } from 'electron'
import path from 'path'
import mainWindowManager from './lib/mainWindowManager'

const { platform } = process
let imgPath: string | NativeImage

let tray: Tray
let mainWindow: any

app.commandLine.appendSwitch('lang', 'zh-CN') // 设置语言环境为中文（简体）
app.commandLine.appendSwitch('charset', 'UTF-8') // 设置字符编码为 UTF-8

if (require('electron-squirrel-startup')) {
  app.quit()
}

app.on('ready', async () => {
  createWindow(mainWindow)
})

app.whenReady().then(() => {
  const mw = mainWindowManager.getWindow()

  if (platform === 'darwin') {
    imgPath = isDev
      ? path.resolve(__dirname, '../../assets/menu_bar.png')
      : nativeImage.createFromPath(path.join(process.resourcesPath, 'menu_bar.png'))
  }
  if (platform === 'win32') {
    imgPath = isDev
      ? path.resolve(__dirname, '../../assets/icon.ico')
      : path.join(process.resourcesPath, 'icon.ico')
  }

  tray = new Tray(imgPath)

  const contextMenu = Menu.buildFromTemplate([
    isMac && {
      label: '显示/隐藏窗口',
      click: () => {
        mw.isVisible() ? mw.hide() : mw.show()
      }
    },
    {
      label: '退出',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        tray.destroy()
        mw.destroy()
        app.quit()
      }
    }
  ])

  tray.setToolTip('Electron-react-rspack')
  tray.setContextMenu(contextMenu)

  tray.on('double-click', () => {
    mw.isVisible() ? mw.hide() : mw.show()
  })
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(mainWindow)
  }
})
