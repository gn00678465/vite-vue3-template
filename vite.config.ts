/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { getRootPath, getSrcPath, plugins } from './build/index';

export default defineConfig((configEnv: ConfigEnv) => {
  return {
    plugins: plugins(configEnv),
    resolve: {
      alias: {
        '~': getRootPath(),
        '@': getSrcPath()
      }
    }
  };
});
