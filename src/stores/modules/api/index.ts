import { ref, Ref, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import {
  fetchCustomerList,
  fetchDepartmentList,
  fetchRoleList,
  fetchModelsList,
  fetchUsersList
} from '@/service/api';

export const useApiStore = defineStore('api-store', () => {
  const customerList = reactive<ApiResponse.CommonData<ApiResponse.CustomItem>>(
    {
      Total: 0,
      Items: []
    }
  );
  const userList: Ref<ApiResponse.UserItem[]> = ref([]);
  const list = reactive({
    roleList: [],
    departmentList: [],
    moduleList: []
  });

  async function fetchCustomer(
    from = 0,
    size = 0,
    options: { reload?: boolean } = {}
  ) {
    const { reload = false } = options;
    if (!reload && customerList.Items.length) return;
    const [err, data] = await fetchCustomerList<
      ApiResponse.CommonData<ApiResponse.CustomItem>
    >(from, size);
    if (data) {
      customerList.Total = data.Total;
      customerList.Items = data.Items;
    }
  }

  async function fetchUsers(
    from = 0,
    size = 0,
    options: { reload?: boolean } = {}
  ) {
    const { reload = false } = options;
    if (!reload && userList.value.length) return;
    const [err, data] = await fetchUsersList<ApiResponse.UserItem[]>(
      from,
      size
    );
    if (data) {
      userList.value = data;
    }
  }

  async function fetchList(
    listName: keyof typeof list,
    options: { reload?: boolean } = {}
  ) {
    const map = new Map<typeof listName, () => Promise<any>>([
      ['roleList', fetchRoleList],
      ['departmentList', fetchDepartmentList],
      ['moduleList', fetchModelsList]
    ]);
    const { reload = false } = options;
    if (map.has(listName) && !reload && list[listName].length) return;
    if (map.has(listName)) {
      const [err, data] = await (map.get(listName) as () => Promise<any>)();
      if (data) {
        list[listName] = data;
      }
    }
  }

  return {
    customerList,
    userList,
    ...toRefs(list),
    fetchCustomer,
    fetchUsers,
    fetchList
  };
});
