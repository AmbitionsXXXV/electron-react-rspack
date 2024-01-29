import { getVersionWithLoop, onFormSave } from '@/main/core/lib'
import { doScheduleLoop } from '@/main/core/runpy'
import { setIsUpdating } from '@/main/lib/scheduler'
import logger from '@/main/utils/wiston'
import { ipcMain } from 'electron'

export async function runScript() {
  ipcMain.handle('run-script', async () => {
    // 执行脚本
    await doScheduleLoop()
  })
}

export async function toggleHandler(): Promise<void> {
  // 释放
  ipcMain.handle('toggle-handle', (_event: { sender: any }, shouldUpdate: Boolean) => {
    logger.info(`sync switch from front: ${shouldUpdate}`)
    setIsUpdating(shouldUpdate)
  })
}

export async function getCoreAndClientVersion(): Promise<void> {
  ipcMain.handle('get-core-and-client-version', async () => {
    return await onFormSave()
  })
}

export async function getCoreAndClientVersionWithLoop(): Promise<void> {
  ipcMain.handle('get-core-and-client-version-loop', async () => {
    return await getVersionWithLoop()
  })
}

export const registerIPC = () => {
  toggleHandler()
  getCoreAndClientVersion()
  getCoreAndClientVersionWithLoop()
}
