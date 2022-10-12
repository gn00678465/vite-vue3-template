/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vite';
import { vitestConfig, getRootPath, getSrcPath, plugins } from './build/index';

const viteConfig = defineConfig({
  plugins: plugins(getSrcPath()),
  resolve: {
    alias: {
      '~': getRootPath(),
      '@': getSrcPath()
    }
  }
});

export default mergeConfig(viteConfig, vitestConfig);
