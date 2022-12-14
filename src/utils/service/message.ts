import { ERROR_MSG_DURATION, ERROR_NOTIFY_DURATION } from '@/config';
import { useTimeoutFn } from '@vueuse/core';
import { useI18n } from '@/hooks';

const errorMsgStack = new Map<string | number, string>([]);

function addMessage(error: Service.RequestError) {
  if (error.message) {
    errorMsgStack.set(error.code, error.message);
  }
}

function removeMessage(error: Service.RequestError) {
  errorMsgStack.delete(error.code);
}

function hasMessage(error: Service.RequestError) {
  return errorMsgStack.has(error.code);
}

export function showMessage(error: Service.RequestError) {
  if (!error.message || hasMessage(error)) return;
  const { t } = useI18n();
  addMessage(error);
  // error message
  window.$notify?.error({
    title: t('sys.occur_error'),
    content: error.message,
    duration: ERROR_NOTIFY_DURATION
  });
  useTimeoutFn(() => {
    removeMessage(error);
  }, ERROR_MSG_DURATION);
}
