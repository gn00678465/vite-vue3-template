import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { html } from './html';
import VueMacros from 'unplugin-vue-macros/vite';
import unplugin from './unplugin';
import vitestConfig from './vitest.config';

export default function (viteEnv, srcPath: string) {
  return [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx()
      }
    }),
    ...unplugin(srcPath),
    html(viteEnv),
    vitestConfig
  ];
}
