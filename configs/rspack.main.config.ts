import type { Configuration } from '@rspack/core'

import path from 'path'
import { isProduction } from './rspack.env'
import { plugins } from './rspack.plugins'
import { rules } from './rspack.rules'
import { pathResolve } from './utils'

export const mainConfig: Configuration = {
  entry: './src/main/index.ts',
  module: {
    rules
  },
  plugins,
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    tsConfigPath: pathResolve('tsconfig.json'),
    fallback: { stream: require.resolve('stream-browserify') },
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@renderer': path.resolve(__dirname, 'src/renderer/')
    }
  },
  experiments: {
    rspackFuture: {
      newResolver: true
    }
  },
  devtool: isProduction ? false : 'eval-cheap-module-source-map'
}
