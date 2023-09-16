const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config')
const path = require('path')

const devConfig = (env = {}) => merge(baseConfig(env), {
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: 'localhost',
        watchFiles: path.resolve(__dirname, '../src/'),
        allowedHosts: 'all',
        proxy: {
            '/api/v1': {
                target: 'http://localhost:5001',
                ws: false,
                secure: false,
                changeOrigin: true
            },
            '/uploads': {
                target: 'http://localhost/',
                ws: false,
                secure: false,
                changeOrigin: true
            },
        },
        client: {
            overlay: false,
        },
        static: true,
        open: false,
        port: 8081,
        hot: true,
        historyApiFallback: {
            rewrites: [
                {from: /\w+/, to: '/index.html'}
            ]
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports.buildDevTestConfig = devConfig
