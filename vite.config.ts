/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import { vitestConfig, getRootPath, getSrcPath, plugins } from './build/index';

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  return {
    plugins: plugins(viteEnv, getSrcPath()),
    resolve: {
      alias: {
        '~': getRootPath(),
        '@': getSrcPath()
      }
    }
  };
});
