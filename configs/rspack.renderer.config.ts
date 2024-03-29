import { Configuration } from '@rspack/core'
import ReactRefreshPlugin from '@rspack/plugin-react-refresh'

import { isDevelopment, isProduction } from './rspack.env'
import { optimization } from './rspack.optimization'
import { plugins } from './rspack.plugins'
import { rules } from './rspack.rules'
import { pathResolve } from './utils'

rules.push({
  test: /\.(png|jpg|jpeg|gif|svg)$/i,
  type: 'asset'
})

const rendererPlugins = [...plugins]

if (isDevelopment) {
  rendererPlugins.push(new ReactRefreshPlugin())
}

export const rendererConfig: Configuration = {
  devtool: isProduction ? false : 'eval-cheap-module-source-map',
  module: {
    rules
  },
  plugins: rendererPlugins,
  optimization: isProduction ? optimization : undefined,
  resolve: {
    tsConfigPath: pathResolve('tsconfig.json')
  },
  experiments: {
    rspackFuture: {
      newResolver: true
    }
  }
}
