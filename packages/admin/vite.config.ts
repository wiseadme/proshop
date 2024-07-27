import path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// @ts-ignore
import { printUrls } from './cli/print-urls'

const isProd = process.env.NODE_ENV === 'production'

const resolve = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
    base: isProd ? '/admin' : '/',
    resolve: {
        alias: {
            '@': resolve('./src'),
            '@modules': resolve('./src/modules'),
            '@shared': resolve('./src/shared'),
            '@app': resolve('./src/app'),
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                     @import "@/shared/assets/scss/modules/_globals.scss";
                `,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8081,
    },
    plugins: [
        vue({
            script: {
                propsDestructure: true
            }
        }),
        printUrls
    ],
    build: {
        minify: true,
        cssCodeSplit: true,
        cssMinify: true,
    }
})
