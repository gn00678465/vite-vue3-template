import { getCurrentInstance } from 'vue';
import * as vueI18n from 'vue-i18n';
import type { VueI18nTranslation } from 'vue-i18n';
import { i18n } from '@/plugins';

type ReturnType = {
  t: VueI18nTranslation;
};

export function useI18n(): ReturnType {
  const isInSetup = !!getCurrentInstance();
  const { t, ...methods } = isInSetup ? vueI18n.useI18n() : i18n.global;

  return {
    ...methods,
    t
  };
}
