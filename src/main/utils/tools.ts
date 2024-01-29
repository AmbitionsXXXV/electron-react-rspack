import { app } from 'electron'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import util from 'util'

export const isMac = process.platform === 'darwin'

export function escapeSpacesInPath(path: string): string {
  return path.replace(/ /g, '\\ ')
}

export function removePythonLockFile(lockName = 'python.lock'): Promise<void> {
  return new Promise((resolve) => {
    const userDataPath = getUserDataPath()
    const lockFilePath = path.join(userDataPath, lockName)

    // 如果 lockFilePath 不存在 直接跳过
    if (!fs.existsSync(lockFilePath)) {
      resolve()
      return
    }

    // 文件存在，尝试删除
    fsPromises
      .unlink(lockFilePath)
      .then(() => {
        console.log(`[LOCK] #### del ${lockName}.`)
        resolve()
      })
      .catch((error) => {
        console.log(`[LOCK] #### del ${lockName} failed`)
        console.log(error)
        resolve() // 解析 Promise，即使删除失败
      })
  })
}

export function createPythonLockFile(lockName = 'python.lock'): Promise<void> {
  return new Promise((resolve, reject) => {
    const userDataPath = getUserDataPath()
    const lockFilePath = path.join(userDataPath, lockName)

    fsPromises
      .access(lockFilePath, fsPromises.constants.F_OK)
      .then(() => {
        // 文件已存在
        resolve()
      })
      .catch(async () => {
        // 文件不存在
        console.log(`[LOCK] #### create ${lockName}`)
        try {
          await fsPromises.writeFile(lockFilePath, 'lock')
          resolve()
        } catch (error) {
          reject(error)
        }
      })
  })
}

export function getUserDataPath() {
  // 判断是否在 electron环境中
  if (app) {
    return app.getPath('userData')
  } else {
    return '/Users/chrischen/Downloads/test_xbx'
  }
}

export function checkPythonLock(lockName = 'python.lock'): Promise<boolean> {
  const userDataPath = app.getPath('userData')
  const lockFilePath = path.join(userDataPath, lockName)

  // 使用 util.promisify 将 fs.exists 转换为返回 Promise 的函数
  const exists = util.promisify(fs.exists)

  // 返回一个 Promise，这个 Promise 在文件存在时解析为 true，否则解析为 false
  return exists(lockFilePath)
}

export async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
