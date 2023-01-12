import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { html } from './html';
import VueMacros from 'unplugin-vue-macros/vite';
import unplugin from './unplugin';
import { i18n } from './i18n';
import PurgeIcons from 'vite-plugin-purge-icons';

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
    i18n(),
    PurgeIcons({
      content: ['**/*.html', '**/*.js', '**/*.vue', '**/*.jsx', '**/*.tsx'],
      format: 'mjs'
    })
  ];
}
