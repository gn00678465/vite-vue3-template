import { defineComponent, onBeforeMount, ref, h } from 'vue';
import type { Ref } from 'vue';
import FixedCard from '@/components/custom/FixedCard';
import type { FixedCardSlots } from '@/components/custom/FixedCard';
import { NDataTable } from 'naive-ui';
import { EditField } from './components';
import { fetchUsersList, setUserRole, setUserDepartment } from '@/service/api';
import { useAPTerm } from '@/utils';
import {
  createColumns,
  useFetchDepartmentList,
  useFetchRoleList,
  List,
  UserInfo
} from './utils';
import {
  useFetchTableData,
  FetchParams,
  useDataTableDefProps
} from '@/composables/dataTable';
import { assoc, pipe } from 'ramda';
import { useAuthStore } from '@/stores';
import { useNotification } from '@/hooks';

interface EmitParam {
  value: number;
  isEdit: Ref<boolean>;
}

export default defineComponent({
  name: 'UsersListView',
  setup() {
    const total: Ref<number> = ref(0);
    const list: Ref<UserInfo[]> = ref([]);
    const departmentList: Ref<List> = ref([]);
    const roleList: Ref<List> = ref([]);

    const { userInfo } = useAuthStore();
    const { createSuccessNotify, createErrorNotify } = useNotification({
      duration: 1500
    });

    const { currentPage, currentPageSize, loading, loadingStart, loadingEnd } =
      useFetchTableData(fetchData, total);

    onBeforeMount(() => {
      fetchData({
        currentPage: currentPage.value,
        currentPageSize: currentPageSize.value
      });
      Promise.all([
        useFetchDepartmentList(departmentList),
        useFetchRoleList(roleList)
      ]);
    });

    async function fetchData({ currentPage, currentPageSize }: FetchParams) {
      loadingStart();
      const [err, data] = await fetchUsersList(
        useAPTerm(currentPage, currentPageSize).value,
        currentPageSize
      );
      if (data) {
        total.value = data.length;
        list.value = data as UserInfo[];
      } else {
        total.value = 0;
        list.value = [];
      }
      loadingEnd();
    }

    async function updateUserRole(
      rowData: UserInfo,
      { value, isEdit }: EmitParam
    ) {
      const param = pipe(
        assoc('UserId', rowData.UserId),
        assoc('RoleId', value)
      )({});

      const [error, data] = await setUserRole(param);
      if (data) {
        createSuccessNotify({
          title: 'Success',
          content: 'Change Role successful'
        });
        rowData.Role = value;
        isEdit.value = false;
      }
      if (error) {
        createErrorNotify({
          title: 'Error',
          content: error.Message
        });
      }
    }

    async function updateUserDepartment(
      rowData: UserInfo,
      { value, isEdit }: EmitParam
    ) {
      const param = pipe(
        assoc('UserId', rowData.UserId),
        assoc('DepartmentId', value)
      )({});

      const [error, data] = await setUserDepartment(param);
      if (data) {
        createSuccessNotify({
          duration: 1500,
          title: 'Success',
          content: 'Change Department successful'
        });
        rowData.Department = value;
        isEdit.value = false;
      }
      if (error) {
        createErrorNotify({
          title: 'Error',
          content: error.Message
        });
      }
    }

    const { useDataTableReactive, usePaginationReactive } =
      useDataTableDefProps();

    function renderIndex(index: number): number {
      return useAPTerm(currentPage, currentPageSize).value + index + 1;
    }

    function renderRole(rowData: UserInfo) {
      return h(EditField, {
        value: rowData.Role,
        options: roleList.value,
        column: 'Role',
        currentUser: userInfo.UserId === rowData.UserId,
        'onUpdate:value': (data: EmitParam) => {
          updateUserRole(rowData, data);
        }
      });
    }

    function renderDepartment(rowData: UserInfo) {
      return h(EditField, {
        value: rowData.Department,
        options: departmentList.value,
        column: 'Department',
        currentUser: userInfo.UserId === rowData.UserId,
        'onUpdate:value': (data: EmitParam) => {
          updateUserDepartment(rowData, data);
        }
      });
    }

    return () => (
      <FixedCard fixed={true}>
        {{
          default: ({ contentHeight }: FixedCardSlots) => (
            <NDataTable
              style={`height: ${contentHeight.value}px`}
              pagination={usePaginationReactive({
                itemCount: total.value,
                page: currentPage.value,
                pageSize: currentPageSize.value
              })}
              {...useDataTableReactive({
                loading: loading.value,
                data: list.value
              })}
              rowKey={(rowData: UserInfo) => rowData.UserId}
              columns={createColumns({
                renderIndex,
                renderDepartment,
                renderRole
              })}
              on-update:page={(page: number) => {
                currentPage.value = page;
              }}
              on-update:page-size={(size: number) => {
                currentPageSize.value = size;
              }}
            ></NDataTable>
          )
        }}
      </FixedCard>
    );
  }
});
