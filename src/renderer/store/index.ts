import dayjs from 'dayjs'
import { atom } from 'jotai'

export const isUpdatingAtom = atom(false)

export const curTimeAtom = atom<Date | string>('')

export const pythonOutPutAtom = atom(
  `<div className="w-full text-center">---------------------${String(
    dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  )}---------------------</div> \n`
)

export const versionAtom = atom<
  Partial<{ clientVersion: string; coreVersion: string; coreVersionStatus: boolean }>
>({ clientVersion: '0.2.0', coreVersionStatus: false })

export const remoteVersionAtom = atom<string>('')

export const downloadLinkAtom = atom<string>('')

export const isSettingEditAtom = atom<boolean>(false)

export const settingDataKeysAtom = atom<any[]>([])

export const strategyAtom = atom<any[]>([])

export const strategyKVAtom = atom<Partial<Record<string, string>>>({})

export const strategyReverseKVAtom = atom<Partial<Record<string, string>>>({})

export const hasNetworkAtom = atom<boolean>(true)
