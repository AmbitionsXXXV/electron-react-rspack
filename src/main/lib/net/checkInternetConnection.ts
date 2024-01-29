import { net } from 'electron'

export default function checkInternetConnection() {
  return new Promise<boolean>((resolve) => {
    const request = net.request({
      method: 'HEAD',
      protocol: 'http:',
      hostname: 'www.baidu.com'
    })

    request.on('response', () => {
      resolve(true)
    })

    request.on('error', () => {
      resolve(false)
    })

    request.end()
  })
}
