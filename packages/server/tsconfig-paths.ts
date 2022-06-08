const tsconfigPaths = require('tsconfig-paths')
const tsConfig = require('./tsconfig.json')

if (process.env.NODE_ENV === 'production') {
  tsConfig.compilerOptions.paths = Object.keys(tsConfig.compilerOptions.paths).reduce((acc, key) => {
    const [ path ] = tsConfig.compilerOptions.paths[key]
    acc[key] = [ `dist/${ path }` ]
    return acc
  })
}

tsconfigPaths.register({
  baseUrl: './',
  paths: tsConfig.compilerOptions.paths
})
