/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { vitestConfig, getRootPath, getSrcPath } from './build/index';

const viteConfig = defineConfig({
  plugins: [vue(), jsx()],
  resolve: {
    alias: {
      '~': getRootPath(),
      '@': getSrcPath()
    }
  }
});

export default mergeConfig(viteConfig, vitestConfig);
