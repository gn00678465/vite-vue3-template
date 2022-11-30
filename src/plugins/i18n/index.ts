import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import zhTW from '../../locales/zh-TW.json';
import enUS from '../../locales/en-US.json';

type MessageSchema = typeof zhTW;

export function setupI18n(app: App) {
  const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'zh-TW',
    globalInjection: false,
    messages: {
      'zh-TW': zhTW,
      'en-US': enUS
    }
  });

  app.use(i18n);
}
