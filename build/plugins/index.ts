import { loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { html } from './html';
import { mock } from './mock';
import VueMacros from 'unplugin-vue-macros/vite';
import unplugin from './unplugin';
import { getSrcPath } from '../utils';

import vitestConfig from './vitest.config';

export default function (configEnv) {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const isBuild = configEnv.command === 'build';
  return [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx()
      }
    }),
    ...unplugin(getSrcPath()),
    html(viteEnv),
    mock(isBuild),
    vitestConfig
  ];
}
