import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';

import packageJson from './package.json';

const theme = packageJson.theme || {};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/es/${name}/style/css.js`
                }
            ]
        })
    ],
    esbuild: {
        jsxInject: `import React from 'react'`
    },
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
    build: {
        terserOptions: {
            parse: {
                ecma: 2020
            },
            compress: {
                ecma: 5,
                comparisons: false,
                inline: 2
            },
            mangle: {
                safari10: true
            },
            keep_classnames: false,
            keep_fnames: false,
            output: {
                ecma: 5,
                comments: false,
                ascii_only: true
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
