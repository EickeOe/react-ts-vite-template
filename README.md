# react-ts-vite-template

此项目为 react 模板项目，基于 vite2.3 构建, 使用 typescript 开发.

## 运行

### 安装依赖

```bash
yarn
```

### 运行项目

```bash
yarn dev
```

### 打包

```bash
# dev 环境
yarn build:dev

# test 环境
yarn build:test

# pre 环境
yarn build:pre

# prod 环境
yarn build:prod

# 如果没有这么多环境，则可以删除不需要的命令，删除对应环境的env文件
```

## 依赖

此模板默认集成 `antd`,`axios`,`react-use` 库

对应版本：

- antd: 4.15.5
- axios: 0.21.1
- react-use: 17.2.4

集成`less`

对应版本：

- less: 4.1.1

## vite.config

详细配置请看 `vite.config.ts` 文件
已配置项：

- reactRefresh
- antd 按需加载
- esbuild 在 tsx 文件中自动注入:`import React from 'react'`
  - 在 tsx 文件中再也不需要引入 React 啦
- `@`别名:路径为 `src`
- `antd` 主题配置
  - 在 `package.json` 中加入 `theme` 配置，即可覆盖 `antd` 的变量
  - 启动 `dark` 模式: 在 `theme` 中配置 `"dark": true`

## TODO

- 优化打包-提高兼容性等
