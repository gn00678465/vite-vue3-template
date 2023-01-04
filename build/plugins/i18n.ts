import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

export function i18n() {
  return VueI18nPlugin({
    include: resolve(
      dirname(fileURLToPath(import.meta.url)),
      './src/locales/**'
    )
  });
}
