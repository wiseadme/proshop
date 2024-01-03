import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@app': path.resolve(__dirname, './src/app'),
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
    plugins: [vue()],
    build: {
        minify: true,
        cssCodeSplit: true,
        cssMinify: true,
    }
})
