import isDev from 'electron-is-dev'
import { isMac } from '../utils/tools'
import { app, Menu } from 'electron'

export const createMenu = (mainWindow: any) => {
  const menuTemplate: any[] = [
    {
      label: app.name,
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'quit' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
              }
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
      ]
    }
  ]

  if (isDev) {
    menuTemplate.push({
      label: '调试', // 新增的调试菜单
      submenu: [
        {
          label: '打开开发者工具',
          click: () => {
            mainWindow.webContents.openDevTools()
          }
        },
        {
          label: '刷新页面', // 新增的刷新页面菜单项
          click: () => {
            mainWindow.webContents.reload()
          }
        },
        {
          label: '后退', // 新增的后退菜单项
          click: () => {
            mainWindow.webContents.goBack() // 后退到上一个页面
          }
        }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}
