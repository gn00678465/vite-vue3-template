import type { AxiosRequestConfig } from 'axios';

let pendingMap = new Map<string, AbortController>();

export const genPendingKey = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&');

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const key = genPendingKey(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!pendingMap.has(key)) {
      pendingMap.set(key, controller);
    }
  }

  removePending(config: AxiosRequestConfig) {
    const key = genPendingKey(config);
    if (pendingMap.has(key)) {
      const controller = pendingMap.get(key);
      controller && controller?.abort();
      pendingMap.delete(key);
    }
  }

  removeAllPending() {
    pendingMap.forEach((controller) => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }

  reset() {
    pendingMap = new Map<string, AbortController>([]);
  }
}
