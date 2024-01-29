import { storeIPC } from '@/preload/store'
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  ...storeIPC
})
