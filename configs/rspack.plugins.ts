import { rspack } from '@rspack/core'
import NodePolyfill from '@rspack/plugin-node-polyfill'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'
import { isDevelopment } from './rspack.env'
import { pathResolve } from './utils'

const plugins: any[] = [
  new rspack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new rspack.CopyRspackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../assets/fix-corrupted'), // 从项目根目录的assets文件夹复制
        to: path.resolve(__dirname, '../.rspack/renderer/assets') // 复制到指定的目标目录
      }
    ]
  })
]

if (isDevelopment) {
  plugins.push(
    new NodePolyfill(),
    new ForkTsCheckerWebpackPlugin({
      logger: 'webpack-infrastructure',
      async: true,
      formatter: 'codeframe',
      typescript: {
        configFile: pathResolve('tsconfig.json'),
        mode: 'write-references',
        typescriptPath: require.resolve('typescript'),
        configOverwrite: {},
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      },
      devServer: false
    })
  )
}

export { plugins }
