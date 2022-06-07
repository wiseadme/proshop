const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { VueLoaderPlugin } = require('vue-loader')

const resolve = pathStr => path.resolve(__dirname, pathStr)

const PATH = {
  src: resolve('../src'),
  dist: resolve('../dist'),
  public: 'public/',
  assets: 'assets/'
}

module.exports = (env = {}) => {
  return {
    target: env.dev ? 'web' : 'browserslist',
    mode: env.dev ? 'development' : 'production',
    entry: {
      main: [
        'regenerator-runtime/runtime.js',
        resolve('../src/app/main.ts')
      ]
    },
    output: {
      path: PATH.dist,
      filename: '[name].bundle.js',
      assetModuleFilename: 'images/[hash][ext][query]'
    },
    optimization: {
      runtimeChunk: 'single',
      minimize: !env.dev,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              collapse_vars: true,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: true }
            },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true }
            },
            {
              loader: 'eslint-loader'
            }
          ]
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: ['vue-loader', 'eslint-loader']
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                sourceMap: true,
                resources: [
                  resolve('../src/shared/assets/scss/modules/_globals.scss')
                ]
              }
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': PATH.src,
        '@app': `${ PATH.src }/app`,
        '@modules': `${ PATH.src }/modules`,
        '@shared': `${ PATH.src }/shared`,
        vue: env.dev ? 'vue/dist/vue.runtime.esm-browser.js' : 'vue/dist/vue.runtime.esm-browser.prod.js'
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].${ env.dev ? '' : '[hash].' }css`,
        chunkFilename: `css/chunk.[name].css`
      }),
      new HtmlWebpackPlugin({
        title: 'ecommerce-admin',
        hash: false,
        template: PATH.public + 'index.html',
        filename: 'index.html',
        inject: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new VueLoaderPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'none'
      })
    ]
  }
}
