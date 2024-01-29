import type { ModuleOptions } from '@rspack/core'
import { appSrcPath } from './utils'
import { isDevelopment } from './rspack.env'

const swcLoaderOptions = (syntax: 'typescript' | 'ecmascript') => {
  return {
    module: {
      type: 'es6',
      ignoreDynamic: true
    },
    jsc: {
      parser:
        syntax === 'typescript'
          ? {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
              decorators: true
            }
          : {
              syntax: 'ecmascript',
              jsx: true,
              numericSeparator: true,
              classPrivateProperty: true,
              privateMethod: true,
              classProperty: true,
              functionBind: true,
              decorators: true,
              decoratorsBeforeExport: true,
              exportDefaultFrom: true,
              exportNamespaceFrom: true,
              dynamicImport: true,
              nullishCoalescing: true,
              optionalChaining: true,
              importMeta: true,
              topLevelAwait: true,
              importAssertions: true
            },
      target: 'es5',
      // false:正常模式尽可能地遵循 ECMAScript 6 的语义 true:松散模式产生更简单的 ES5 代码
      loose: false,
      externalHelpers: true,
      transform: {
        legacyDecorator: true,
        react: {
          runtime: 'automatic',
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          throwIfNamespace: true,
          development: isDevelopment,
          useBuiltins: true,
          refresh: isDevelopment
        }
      }
    }
  }
}

export const rules: Required<ModuleOptions>['rules'] = [
  {
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.tsx?$/,
    loader: 'builtin:swc-loader',
    include: appSrcPath,
    options: swcLoaderOptions('typescript')
  },
  {
    test: /\.(js|mjs|jsx)$/,
    loader: 'builtin:swc-loader',
    include: appSrcPath,
    options: swcLoaderOptions('ecmascript')
  },
  {
    test: /\.mdx?$/,
    loader: '@mdx-js/loader',
    /** @type {import('@mdx-js/loader').Options} */
    options: {
      /* jsxImportSource: …, otherOptions… */
    }
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {}
            }
          }
        }
      }
    ],
    type: 'css'
  }
]
