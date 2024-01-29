import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import type { ForgeConfig } from '@electron-forge/shared-types'
import { RspackPlugin } from 'electron-forge-plugin-rspack'
import os from 'os'
import { mainConfig } from './configs/rspack.main.config'
import { rendererConfig } from './configs/rspack.renderer.config'

const arch = os.arch()

// 根据架构动态设置路径
const appPath =
  arch === 'arm64'
    ? `${process.cwd()}/out/ElectronReactRspack-darwin-arm64/ElectronReactRspack.app/`
    : `${process.cwd()}/out/ElectronReactRspack-darwin-x64/ElectronReactRspack.app/`

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './assets/icon.ico',
    name: 'ElectronReactRspack',
    // if need admin permission, uncomment this
    // win32metadata: {
    //   'requested-execution-level': 'requireAdministrator'
    // },
    extraResource: [
      './assets/fix-corrupted',
      './assets/icon.ico',
      './assets/menu_bar.png'
    ]
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin', 'win32', 'x64']),
    new MakerRpm({}),
    new MakerDeb({}),
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
        overwrite: true,
        additionalDMGOptions: {
          window: { size: { width: 600, height: 380 } },
          'background-color': 'rgba(0, 0, 0, 0)'
        },
        icon: './assets/mac_icon.icns',
        background: './assets/background.png',
        contents: [
          {
            x: 448,
            y: 130,
            type: 'link',
            path: '/Applications'
          },
          {
            x: 150,
            y: 130,
            type: 'file',
            path: appPath
          }
        ]
      }
    }
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new RspackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            name: 'main_window',
            html: './src/renderer/index.html',
            js: './src/renderer/renderer.ts',
            preload: {
              js: './src/preload/index.ts'
            }
          }
        ]
      },
      devContentSecurityPolicy:
        "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:;img-src *;"
    })
  ]
}

export default config
