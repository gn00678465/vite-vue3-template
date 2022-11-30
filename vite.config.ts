/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';
import {
  vitestConfig,
  getRootPath,
  getSrcPath,
  plugins,
  createViteProxy
} from './build/index';
import { getServiceEnvConfig } from './.env-config.ts';

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const envConfig = getServiceEnvConfig(configEnv.mode);
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';

  return {
    plugins: plugins(viteEnv, getSrcPath()),
    resolve: {
      alias: {
        '~': getRootPath(),
        '@': getSrcPath()
      }
    },
    server: {
      cors: true,
      port: 3002,
      host: '0.0.0.0',
      proxy: createViteProxy(isOpenProxy, envConfig),
    }
  };
});
