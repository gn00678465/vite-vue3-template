import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import zhTW from '@/locales/lang/zhTW';
import enUS from '@/locales/lang/enUS';

type MessageSchema = typeof zhTW['message'];

export const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  messages: {
    'zh-TW': zhTW.message,
    'en-US': enUS.message
  }
});

export function setupI18n(app: App) {
  app.use(i18n);
}
