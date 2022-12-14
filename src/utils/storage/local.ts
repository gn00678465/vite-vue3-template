import { encrypt, decrypt } from '../crypto';

interface StorageData<T> {
  value: T;
  expire: number | null;
}

export function createLocalStorage<T extends StorageInterface.Local>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: null
    };

    const json = JSON.stringify(storageData);
    window.localStorage.setItem(key as string, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string);
    if (json) {
      let storageData: StorageData<T[K]> | null = null;
      try {
        storageData = JSON.parse(json);
      } catch (e) {
        // parse failure
      }

      if (storageData) {
        return storageData.value as T[K];
      }
      remove(key);
      return null;
    }
    return null;
  }

  function setEncrypt<K extends keyof T>(key: K, value: T[K]) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: null
    };
    const json = encrypt(storageData);
    window.localStorage.setItem(key as string, json);
  }

  function getDecrypt<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string);
    if (json) {
      let storageData: StorageData<T[K]> | null = null;
      try {
        storageData = decrypt(json);
      } catch (e) {
        // parse failure
      }

      if (storageData) {
        return storageData.value as T[K];
      }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(key as string);
  }

  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    setEncrypt,
    get,
    getDecrypt,
    remove,
    clear
  };
}

export const localStorage = createLocalStorage();
