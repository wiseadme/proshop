import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

const resolve = (str: string) => path.resolve(__dirname, str)

// https://vitejs.dev/config/
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
        port: 8081,
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
        }
    },
    plugins: [vue({
        script: {
            propsDestructure: true
        }
    })],
    build: {
        minify: true,
        cssCodeSplit: true,
        cssMinify: true,
    }
})
