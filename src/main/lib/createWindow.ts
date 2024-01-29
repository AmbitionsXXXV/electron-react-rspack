import { IntervalControl } from '@/main/lib/net/IntervalControl'
import mainWindowManager from '@/main/lib/mainWindowManager'
import { createMenu } from '@/main/lib/menu'
import { setIsUpdating } from '@/main/lib/scheduler'
import { app, dialog, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import Store from 'electron-store'

const { platform } = process

const store = new Store()

declare const MAIN_WINDOW_RSPACK_ENTRY: string

let isQuitting = false // 添加一个标志来表示是否正在退出应用

export const createWindow = (mainWindow: any): void => {
  mainWindow = mainWindowManager.createWindow()

  const isAutoLogin = store.get('settings.is_auto_login') ?? false
  const is_auto_launch_update = store.get('settings.is_auto_launch_update', false)

  is_auto_launch_update && setIsUpdating(true)

  IntervalControl()

  mainWindow.once('ready-to-show', () => {
    if (!app.getLoginItemSettings().wasOpenedAsHidden) mainWindow.show()
  })

  if (app.isPackaged && isAutoLogin) {
    // 设置开机启动
    app.setLoginItemSettings({
      enabled: true,
      openAtLogin: true,
      openAsHidden: true
    })
  }

  ipcMain.on('toggle-auto-start', (_event, isEnabled: boolean) => {
    isEnabled
      ? app.setLoginItemSettings({
          enabled: true,
          openAtLogin: true,
          openAsHidden: true
        })
      : app.setLoginItemSettings({
          openAtLogin: false,
          openAsHidden: false
        })
  })

  mainWindow.loadURL(MAIN_WINDOW_RSPACK_ENTRY)

  createMenu(mainWindow)

  // 隐藏窗口而不是完全关闭
  mainWindow.on('close', (e: any) => {
    if (!isQuitting) {
      e.preventDefault()

      const isMinimize = store.get('settings.user_choice')

      if (isMinimize !== undefined) {
        if (isMinimize) {
          mainWindow?.minimize()
          mainWindow?.hide()
        } else {
          isQuitting = true
          mainWindow.destroy()
          app.quit()
        }
      } else {
        dialog
          .showMessageBox({
            type: 'question',
            buttons: ['直接退出', '最小化到系统托盘'],
            title: '确认',
            message: '你想要退出应用还是最小化到托盘？',
            checkboxLabel: '记住我的选择，不再提示',
            checkboxChecked: false
          })
          .then((response) => {
            if (response.checkboxChecked) {
              store.set('settings.user_choice', response.response === 0 ? false : true)
            }

            if (response.response === 0) {
              isQuitting = true // 用户选择关闭，设置标志为 true
              mainWindow.destroy()
              app.quit()
            }

            if (response.response === 1) {
              mainWindow?.minimize()
              mainWindow?.hide()
            }
          })
      }
    }

    if (platform === 'darwin') {
      app.dock.hide()
    }
  })

  isDev && mainWindow.webContents.openDevTools()
}
