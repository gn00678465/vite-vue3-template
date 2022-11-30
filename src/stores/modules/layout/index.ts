import { defineStore } from 'pinia';
import { useContext } from '@/hooks';

export const useLayoutStore = defineStore('layout-store', () => {
  const { useProvide, useInject } = useContext('ContentHeight');

  return { useContentProvide: useProvide, useContentInject: useInject };
});
