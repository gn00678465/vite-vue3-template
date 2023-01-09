---
layout: doc
---

# 開始

## 環境設定

本地環境需要安裝 [Node.js v16.17+](#安裝-node-js), [yarn 1.21+](#啟用-yarn), [Git](https://git-scm.com/)

## 工具配置

## 安裝

### 安裝 Node.js

[Official Web Site](https://nodejs.org/en/)

### 啟用 yarn

[Official Web Site](https://yarnpkg.com/)
<br />
[安裝教學](/tutorial/install#yarn)

## 插件設定

### 安裝 Volar, 禁用 Vetur

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=vue.volar) - volar 插件， Language support for Vue 3

## npm scripts

```json
{
  // 本地端啟動(dev 模式)
  "dev": "vite",
  // 本地端編譯(prod 模式)
  "build": "yarn typecheck && vite build",
  // (debug 模式)
  "debug": "vite --debug",
  // 本地端預覽編譯後的 dist
  "preview": "vite preview",
  // 檢查 source code 是否符合 eslint 規範並修正
  "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
  // 調整 source code 格式
  "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
  // Typescript 型別檢查
  "typecheck": "vue-tsc --noEmit --skipLibCheck",
  // Unit Test
  "test": "vitest",
  // Unit Test 並產生 coverage 報告
  "coverage": "vitest run --coverage",
  // E2E Test
  "cy:test": "npx cypress open",
  // E2E Test
  "cy:run": "npx cypress run",
  // Document dev
  "docs:dev": "vitepress dev docs --port 5000",
  // Document 編譯
  "docs:build": "vitepress build docs",
  // Document 預覽編譯後的 dist
  "docs:preview": "vitepress preview docs"
}
```

## 目錄說明

```text
├─.vscode
├─build
│  ├─plugins
│  └─utils
├─cypress                      // E2E Test 設定 & 測試檔
├─docker                       // Dockerfile
├─docs                         // document 檔案
├─public
├─src
│  ├─assets
│  │  └─svg-icons              // svg 檔案
│  ├─components
│  │  ├─business
│  │  │  └─LoadingEmptyWrapper
│  │  ├─common
│  │  └─custom
│  │      ├─FixedCard
│  │      └─SwalProvider       // 廢棄
│  ├─composables
│  │  └─dataTable
│  ├─config                    // 全域常數設定
│  ├─enum
│  ├─hooks                     // composition Hooks
│  │  ├─common                 // 通用
│  │  └─web                    // web
│  ├─layouts                   // 布局元件
│  │  ├─AdminLayout            // 主要布局
│  │  ├─BlankLayout            // 空白布局
│  │  └─common                 // 元件
│  ├─locales                   // 語言檔
│  ├─pages                     // 頁面
│  ├─plugins                   // 初始化 Vue 插件
│  │  ├─i18n                   //
│  │  └─msal                   // Azure OAuth 設定
│  ├─router                    // Vue-router 設定
│  │  ├─guard                  // Vue-router guard 設定
│  │  ├─modules
│  │  └─routes
│  ├─service                   // Axios 設定
│  │  ├─api                    // RESTful API 設定
│  │  └─request                // Axios 基本設定
│  ├─settings
│  ├─stores                    // Pinia 狀態管理
│  │  ├─modules
│  │  ├─plugins
│  │  └─subscribe
│  ├─style
│  ├─types                     // Typescript 型別定義檔(*.d.ts)
│  └─utils                     // Utility (Only pure function)
└─test                         // Unit Test 測試檔
```
