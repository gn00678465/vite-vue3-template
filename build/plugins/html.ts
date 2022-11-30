import { createHtmlPlugin } from 'vite-plugin-html';

export const html = (viteEnv) => {
  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        appTitle: viteEnv.VITE_APP_TITLE,
        appName: viteEnv.VITE_APP_NAME
      }
    }
  });
};
