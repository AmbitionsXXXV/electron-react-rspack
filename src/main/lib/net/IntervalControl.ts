import checkInternetConnection from '@/main/lib/net/checkInternetConnection'
import mainWindowManager from '@/main/lib/mainWindowManager'
import { BrowserWindow, ipcMain } from 'electron'

export const IntervalControl = () => {
  let networkCheckInterval = null

  const startNetworkCheck = (mainWindow: BrowserWindow) => {
    networkCheckInterval = setInterval(() => {
      checkInternetConnection().then((isConnected) => {
        mainWindow.webContents.send('network-status', isConnected)
      })
    }, 1000) // 每1秒检查一次
  }

  startNetworkCheck(mainWindowManager.getWindow())

  const stopNetworkCheck = () => {
    if (networkCheckInterval) {
      clearInterval(networkCheckInterval)
      networkCheckInterval = null
    }
  }

  ipcMain.on('start-network-check', () => {
    const mainWindow = mainWindowManager.getWindow()

    startNetworkCheck(mainWindow)
  })

  ipcMain.on('stop-network-check', stopNetworkCheck)
}
