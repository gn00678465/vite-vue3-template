import {
  useOffsetPagination,
  UseOffsetPaginationOptions,
  UseOffsetPaginationReturn
} from '@vueuse/core';
import { useLoading, UseLoadingReturn } from '@/hooks';

export interface UseFetchTableDataOptions extends UseOffsetPaginationOptions {
  onPageUpdate?: (arg: number) => void;
  opPageSizeUpdate?: (arg: number) => void;
}

type ReturnValue = UseOffsetPaginationReturn & UseLoadingReturn;

export interface UseFetchTableDataReturnValue extends ReturnValue {
  onPageUpdate: (arg: number) => void;
  opPageSizeUpdate: (arg: number) => void;
}

export function useFetchTableData(
  options: UseFetchTableDataOptions
): UseFetchTableDataReturnValue {
  const {
    total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onPageCountChange,
    onPageUpdate = handleUpdatePage,
    opPageSizeUpdate = handleUpdatePageSize
  } = options;

  const { loading, loadingStart, loadingEnd } = useLoading(false);

  const { currentPage, currentPageSize, ...returnValue } = useOffsetPagination({
    total: total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onPageCountChange
  });

  function handleUpdatePage(page: number) {
    currentPage.value = page;
  }

  function handleUpdatePageSize(pageSize: number) {
    currentPageSize.value = pageSize;
  }

  return {
    currentPage,
    currentPageSize,
    ...returnValue,
    onPageUpdate,
    opPageSizeUpdate,
    loading,
    loadingStart,
    loadingEnd
  };
}
