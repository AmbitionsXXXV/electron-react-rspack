import { ipcRenderer } from 'electron'

export const storeIPC = {
  setStoreValue: (key: string, value: any) => {
    ipcRenderer.invoke('set-store', key, value)
  },
  getStoreValue: (key: string, defaultValue: any = {}) =>
    ipcRenderer.invoke('get-store', key, defaultValue),
  deleteStoreValue: (key: string) => ipcRenderer.invoke('delete-store', key)
}
