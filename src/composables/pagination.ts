import { ref, computed, unref, Ref, watchEffect } from 'vue';
import {
  MaybeRef,
  useOffsetPagination,
  UseOffsetPaginationOptions,
  UseOffsetPaginationReturn
} from '@vueuse/core';
import { pagination } from '@/utils';
import { useLoading, UseLoadingReturn } from '../hooks/common/useLoading';
import { useTimeoutFn } from '@vueuse/core';

export interface UsePaginationOptions extends UseOffsetPaginationOptions {
  onPageUpdate?: (arg: number) => void;
  opPageSizeUpdate?: (arg: number) => void;
}

type Return = UseOffsetPaginationReturn & UseLoadingReturn;

export interface UsePaginationReturn<T> extends Return {
  onPageUpdate: (arg: number) => void;
  opPageSizeUpdate: (arg: number) => void;
  paginationData: Ref<Array<Array<T>>>;
  currentData: Ref<Array<T>>;
}

export function usePagination<T>(
  base: MaybeRef<T[]>,
  options: UsePaginationOptions
): UsePaginationReturn<T> {
  const {
    total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onPageUpdate = handleUpdatePage,
    opPageSizeUpdate = handleUpdatePageSize
  } = options;
  const paginationData = ref([]) as Ref<Array<Array<T>>>;

  const {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next
  } = useOffsetPagination({
    total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange
  });

  const { loading, loadingStart, loadingEnd } = useLoading();

  function handleUpdatePage(page: number) {
    currentPage.value = page;
  }

  function handleUpdatePageSize(pageSize: number) {
    currentPageSize.value = pageSize;
  }

  const handlePaginationData = function (
    size: MaybeRef<number>,
    data: MaybeRef<T[]>
  ) {
    return pagination(unref(data), unref(size));
  };

  function handlePaginationDataUpdate(
    currentPageSize: MaybeRef<number>,
    base: MaybeRef<T[]>
  ) {
    loadingStart();
    paginationData.value = handlePaginationData(currentPageSize, unref(base));
    useTimeoutFn(loadingEnd, 100);
  }

  const currentData = computed(() => {
    loadingStart();
    const res = unref(paginationData)[unref(currentPage) - 1] || [];
    useTimeoutFn(loadingEnd, 100);
    return res;
  });

  watchEffect(
    () => {
      handlePaginationDataUpdate(currentPageSize, base);
    },
    { flush: 'post' }
  );

  return {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
    //
    onPageUpdate,
    opPageSizeUpdate,
    paginationData,
    currentData,
    //
    loading,
    loadingStart,
    loadingEnd
  };
}
