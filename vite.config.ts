import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';

import packageJson from './package.json';

const theme = packageJson.theme || {};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/es/${name}/style/index.js`
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3001,
        proxy: {
            // 字符串简写写法
            '/foo': 'http://localhost:4567/foo',
            // 选项写法
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            // 正则表达式写法
            '^/fallback/.*': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fallback/, '')
            }
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    ...getThemeVariables(theme),
                    ...theme
                }
            }
        }
    }
});
