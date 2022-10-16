/// <reference types="vitest" />
export default {
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  }
};
