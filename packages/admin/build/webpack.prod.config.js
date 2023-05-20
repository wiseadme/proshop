const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

const buildConfig = (env = {}) => merge(baseConfig(env), {
    plugins: [],
    devtool: 'source-map'
})

module.exports = new Promise(res => {
    res(buildConfig({dev: false}))
})
