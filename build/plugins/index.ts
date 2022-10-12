import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';
import unplugin from './unplugin';

export default function (srcPath: string) {
  return [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx()
      }
    }),
    ...unplugin(srcPath)
  ];
}
