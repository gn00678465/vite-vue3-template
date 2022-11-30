import type { ProxyOptions } from 'vite';

export function createViteProxy(isOpenProxy: boolean, envConfig) {
  if (!isOpenProxy) return undefined;

  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.urlPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      secure: false,
      rewrite: (path) =>
        path.replace(new RegExp(`^${envConfig.urlPattern}`), '')
    }
  };

  return proxy;
}
