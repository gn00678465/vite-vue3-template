import { defineComponent, ref, onBeforeMount, h, watch } from 'vue';
import type { Ref, VNodeChild } from 'vue';
import FixedCard from '@/components/custom/FixedCard';
import type { FixedCardSlots } from '@/components/custom/FixedCard';
import { NDataTable, NButton } from 'naive-ui';
import type { DataTableFilterState } from 'naive-ui';
import { CreateButton } from './components';
import { useResizeObserver } from '@vueuse/core';
import { useAPTerm } from '@/utils';
import {
  createColumns,
  ApplicationTableData,
  Types,
  useApplicationFormFetch,
  FetchKeys
} from './utils';
import {
  useFetchTableData,
  FetchParams,
  useDataTableDefProps
} from '@/composables/dataTable';
import { useI18n } from '@/hooks';

export default defineComponent({
  name: 'ApplicationFormListView',
  setup(props, ctx) {
    const { t } = useI18n();
    const banner: Ref<null | HTMLElement> = ref(null);
    const bannerHeight: Ref<number> = ref(0);

    const stateFilter: Ref<FetchKeys | null> = ref(null);
    const { fetchApi } = useApplicationFormFetch(stateFilter);

    const total: Ref<number> = ref(0);
    const database: Ref<ApplicationTableData[]> = ref([]);

    useResizeObserver(banner, (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      bannerHeight.value = height + 8;
    });

    const { currentPage, currentPageSize, loading, loadingStart, loadingEnd } =
      useFetchTableData(fetchData, total);

    async function fetchData({ currentPage, currentPageSize }: FetchParams) {
      loadingStart();
      const [err, data] = await fetchApi.value(
        useAPTerm(currentPage, currentPageSize).value,
        currentPageSize
      );
      if (data) {
        total.value = data.length;
        database.value = data as ApplicationTableData[];
      }
      if (data === null) {
        total.value = 0;
        database.value = [];
      }
      loadingEnd();
    }

    watch(fetchApi, () => {
      currentPage.value = 1;
      fetchData({
        currentPage: currentPage.value,
        currentPageSize: currentPageSize.value
      });
    });

    onBeforeMount(() => {
      fetchData({
        currentPage: currentPage.value,
        currentPageSize: currentPageSize.value
      });
    });

    const { useDataTableReactive, usePaginationReactive } =
      useDataTableDefProps();

    function handleSelectForm(key: Types) {
      console.log(key);
    }

    function renderIndex(index: number): number {
      return useAPTerm(currentPage, currentPageSize).value + index + 1;
    }

    function renderAction(
      rowData: ApplicationTableData,
      index: number
    ): VNodeChild {
      return h('div', { class: 'flex justify-center items-center gap-x-1' }, [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => {
              console.log(rowData.CRMUrl);
            }
          },
          () => 'CRM'
        ),
        h(NButton, { size: 'small' }, () => t('common.view'))
      ]);
    }

    return () => (
      <FixedCard fixed={true}>
        {{
          default: ({ contentHeight }: FixedCardSlots) => (
            <div class="flex flex-col gap-y-2">
              <div ref={banner} class="flex flex-items justify-end">
                <CreateButton on-select={handleSelectForm} />
              </div>
              <NDataTable
                style={`height: ${contentHeight.value - bannerHeight.value}px`}
                {...useDataTableReactive({
                  loading: loading.value,
                  data: database.value
                })}
                rowKey={(rowData: ApplicationTableData) =>
                  rowData.ApplicationFormId
                }
                columns={createColumns({ renderIndex, renderAction })}
                pagination={usePaginationReactive({
                  itemCount: total.value,
                  page: currentPage.value,
                  pageSize: currentPageSize.value
                })}
                on-update:page={(page: number) => {
                  currentPage.value = page;
                }}
                on-update:page-size={(size: number) => {
                  currentPageSize.value = size;
                }}
                on-update:filters={(filters: DataTableFilterState) => {
                  stateFilter.value = filters.State as FetchKeys;
                }}
              ></NDataTable>
            </div>
          )
        }}
      </FixedCard>
    );
  }
});
