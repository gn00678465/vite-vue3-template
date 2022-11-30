/// <reference types="vitest" />
export default {
  test: {
    globals: true,
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  }
};
