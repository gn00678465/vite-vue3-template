import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

export function i18n() {
  return vueI18n({
    include: resolve(
      dirname(fileURLToPath(import.meta.url)),
      './src/locales/**'
    )
  });
}
