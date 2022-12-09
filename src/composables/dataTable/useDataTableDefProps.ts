import { reactive } from 'vue';
import type { DataTableProps, PaginationProps } from 'naive-ui';

interface ReturnType {
  useDataTableReactive: (arg?: DataTableProps) => DataTableProps;
  usePaginationReactive: (arg?: PaginationProps) => PaginationProps;
}

export function useDataTableDefProps(): ReturnType {
  const initPaginationProps = reactive<PaginationProps>({
    pageSizes: [10, 20, 30, 40],
    size: 'small',
    pageSlot: 5,
    showSizePicker: true
  });

  const initDataTableProps = reactive<DataTableProps>({
    remote: true,
    flexHeight: true,
    singleColumn: false,
    singleLine: false
  });

  function useDataTableReactive(
    dataTableProps: DataTableProps = {}
  ): DataTableProps {
    return Object.assign(initDataTableProps, dataTableProps);
  }

  function usePaginationReactive(
    paginationProps: PaginationProps = {}
  ): PaginationProps {
    return Object.assign(initPaginationProps, paginationProps);
  }

  return {
    useDataTableReactive,
    usePaginationReactive
  };
}
