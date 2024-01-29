import { IpcMainInvokeEvent, ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()

const setStoreIPC = () =>
  ipcMain.handle('set-store', async (__: IpcMainInvokeEvent, key, value) => {
    await store.set(key, value)
  })

const getStoreIPC = () =>
  ipcMain.handle('get-store', async (_: IpcMainInvokeEvent, key, defaultValue = {}) => {
    const value = await store.get(key)

    if (typeof value === 'boolean') {
      return value
    }

    return (await store.get(key)) || defaultValue
  })

const deleteStoreIPC = () =>
  ipcMain.handle('delete-store', (_: IpcMainInvokeEvent, key) => {
    store.delete(key)
  })

export const registerStoreIPC = () => {
  setStoreIPC()
  getStoreIPC()
  deleteStoreIPC()
}
