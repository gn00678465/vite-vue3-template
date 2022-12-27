/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default (srcPath: string) =>
  defineConfig({
    test: {
      globals: true,
      include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      environment: 'happy-dom',
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    },
    resolve: {
      alias: {
        '@': srcPath
      }
    }
  });
