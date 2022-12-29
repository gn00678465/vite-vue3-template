import { mergeRight } from 'ramda';
import type { NotificationOptions } from 'naive-ui';

type NotifyFun<T> = (options: T) => void;

interface ReturnType<T> {
  createSuccessNotify: NotifyFun<T>;
  createErrorNotify: NotifyFun<T>;
  createWarningNotify: NotifyFun<T>;
  createInfoNotify: NotifyFun<T>;
  createNotify: NotifyFun<T>;
  destroyAllNotify: () => void;
}

export function useNotification(
  initOption: NotificationOptions = {}
): ReturnType<NotificationOptions> {
  function createSuccessNotify(options: NotificationOptions) {
    window.$notify.success(mergeRight(initOption, options));
  }

  function createErrorNotify(options: NotificationOptions) {
    window.$notify.error(mergeRight(initOption, options));
  }

  function createWarningNotify(options: NotificationOptions) {
    window.$notify.warning(mergeRight(initOption, options));
  }

  function createInfoNotify(options: NotificationOptions) {
    window.$notify.info(mergeRight(initOption, options));
  }

  function createNotify(options: NotificationOptions) {
    window.$notify.create(mergeRight(initOption, options));
  }

  function destroyAllNotify() {
    window.$notify.destroyAll();
  }

  return {
    createSuccessNotify,
    createErrorNotify,
    createWarningNotify,
    createInfoNotify,
    createNotify,
    destroyAllNotify
  };
}
