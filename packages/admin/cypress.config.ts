import { defineConfig } from 'cypress'
import { buildDevTestConfig } from './build/webpack.cypress.dev.config'

export default defineConfig({
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'webpack',
            webpackConfig: buildDevTestConfig({ dev: true, test: true }),
        },
    },
    e2e: {
        baseUrl: 'http://localhost:8081',
        supportFile: false,
        experimentalOriginDependencies: true
    },
})
