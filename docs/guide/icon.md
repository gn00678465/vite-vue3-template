---
layout: doc
---

# 系統圖示

## Basic

透過 iconify 可加載大量 Icon，
透過 unplugin-icons 插件，將 svg 檔案轉換為 vue 元件。

[iconify](https://github.com/iconify/iconify)

[unplugin-icons](https://github.com/antfu/unplugin-icons)

## 使用方式

### 1. 靜態載入

- 本地 SVG 檔案
  - 於 `assets/svg-icons` 加入 svg 檔案
  - 取得 SVG 的檔案名稱 `[svg-filename]`
  - 於要顯示的 template 內使用
    ```html
    <icon-custom-[svg-filename] />
    ```

### 2. 動態載入

- iconify

  - 取得 icon 名稱
  - 動態渲染

    ```typescript
    import SvgIcon from '@/components/custom/SvgIcon';
    ```

    ```html
    <svg-icon icon="icon名稱"></svg-icon>
    ```

### 3. 使用 Render function 載入

- 取得 Icon 名稱
- 使用 `useRenderIcon`

  ```typescript
  import { useRenderIcon } from '@/composables';

  interface Config {
    icon: string; // icon 名稱
    fontSize: number;
    color: string;
    className: string;
  }

  useRenderIcon(config: Config)
  ```
