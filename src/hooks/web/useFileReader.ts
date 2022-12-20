import { computed, ref, Ref } from 'vue';
import { useBoolean } from '../common';
import { useEventListener } from '@vueuse/core';

type FileReaderMethods =
  | 'readAsText'
  | 'readAsDataURL'
  | 'readAsBinaryString'
  | 'readAsArrayBuffer';

type Options = {
  encoding?: string;
};

type Callback = (arg: any) => void;

export function useFileReader(file: File, options: Options = {}) {
  const { bool: isReading, setTrue, setFalse } = useBoolean(false);
  const fileRef: Ref<File> = ref(file);
  const error: Ref<any | null> = ref(null);
  const { encoding = 'UTF-8' } = options;

  const fileName = computed<string>(() => fileRef.value.name);
  const fileSize = computed<number>(() => fileRef.value.size);
  const fileMine = computed<string>(() => fileRef.value.type);
  const lastModified = computed<number>(() => fileRef.value.lastModified);

  function readAsPromise(method: FileReaderMethods) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      useEventListener(reader, 'load', (e: ProgressEvent) => {
        resolve(reader.result);
      });
      useEventListener(reader, 'error', function (error) {
        reject(error);
      });
      if (method === 'readAsText') {
        reader[method](fileRef.value, encoding);
      } else {
        reader[method](fileRef.value);
      }
    });
  }

  function readAsText(onLoad: Callback, onError?: Callback) {
    setTrue();
    readAsPromise('readAsText').then(onLoad).catch(onError).finally(setFalse);
  }

  function readAsDataURL(onLoad: Callback, onError?: Callback) {
    setTrue();
    readAsPromise('readAsDataURL')
      .then(onLoad)
      .catch(onError)
      .finally(setFalse);
  }

  function readAsBinaryString(onLoad: Callback, onError?: Callback) {
    setTrue();
    readAsPromise('readAsBinaryString')
      .then(onLoad)
      .catch(onError)
      .finally(setFalse);
  }

  function readAsArrayBuffer(onLoad: Callback, onError?: Callback) {
    setTrue();
    readAsPromise('readAsArrayBuffer')
      .then(onLoad)
      .catch(onError)
      .finally(setFalse);
  }

  return {
    isReading,
    error,
    fileName,
    fileSize,
    fileMine,
    lastModified,
    readAsText,
    readAsDataURL,
    readAsBinaryString,
    readAsArrayBuffer
  };
}
