const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')
const path = require('path')

const devConfig = (env = {}) => merge(baseConfig(env), {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: 'localhost',
    watchFiles: path.resolve(__dirname, '../src/'),
    allowedHosts: 'all',
    proxy: {
      '/v1': {
        target: 'http://localhost:5000/',
        // target: 'http://193.168.3.84:5000/',
        ws: false,
        secure: false,
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost/',
        ws: false,
        secure: false,
        changeOrigin: true
      }
    },
    static: true,
    open: false,
    port: 8081,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\w+/, to: '/index.html' }
      ]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = new Promise(res => res(devConfig({ dev: true })))
