/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';
import {
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
      https: {
        key: fs.readFileSync('./localhost+3-key.pem'),
        cert: fs.readFileSync('./localhost+3.pem')
      }
    },
    logLevel: 'warn',
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/');
              switch (arr[0]) {
                case '@vue':
                case 'naive-ui':
                  return '_' + arr[0];
                  break;
                default:
                  return '__vendor';
                  break;
              }
            }
          }
        }
      }
    }
  };
});
