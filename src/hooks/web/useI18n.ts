import { i18n } from '@/plugins';

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type ReturnType = {
  t: I18nGlobalTranslation;
};

export function useI18n(): ReturnType {
  const { t, ...methods } = i18n.global;

  return {
    ...methods,
    t
  };
}
