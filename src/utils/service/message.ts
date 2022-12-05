import { ERROR_MSG_DURATION } from '@/config';
import { useTimeoutFn } from '@vueuse/core';

const errorMsgStack = new Map<string | number, string>([]);

function addMessage(error: Service.RequestError) {
  errorMsgStack.set(error.code, error.message);
}

function removeMessage(error: Service.RequestError) {
  errorMsgStack.delete(error.code);
}

function hasMessage(error: Service.RequestError) {
  return errorMsgStack.has(error.code);
}

export function showMessage(error: Service.RequestError) {
  if (!error.message || hasMessage(error)) return;
  addMessage(error);
  // error message
  useTimeoutFn(() => {
    removeMessage(error);
  }, ERROR_MSG_DURATION);
}
