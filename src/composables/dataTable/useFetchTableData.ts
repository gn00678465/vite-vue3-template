import type { Ref } from 'vue';
import { useOffsetPagination, useDebounceFn } from '@vueuse/core';
import { useLoading } from '@/hooks';

export interface FetchParams {
  currentPage: number;
  currentPageSize: number;
}

interface ReturnType {
  currentPage: Ref<number>;
  currentPageSize: Ref<number>;
  loading: Ref<boolean>;
  loadingStart: () => void;
  loadingEnd: () => void;
}

interface Options {
  page?: number;
  pageSize?: number;
  delay?: number;
}

export function useFetchTableData(
  fetchDataFun: (arg: FetchParams) => void,
  total: Ref<number>,
  options: Options = {}
): ReturnType {
  const { page = 1, pageSize = 20, delay = 50 } = options;

  const { loading, loadingStart, loadingEnd } = useLoading(false);

  const debounceFetch = useDebounceFn(fetchDataFun, delay);

  const { currentPage, currentPageSize } = useOffsetPagination({
    total: total,
    page,
    pageSize,
    onPageChange: debounceFetch,
    onPageSizeChange: debounceFetch
  });

  return {
    currentPage,
    currentPageSize,
    loading,
    loadingStart,
    loadingEnd
  };
}
