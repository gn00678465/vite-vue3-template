import type { Ref } from 'vue';

import { fetchDepartmentList, fetchRoleList } from '@/service/api';

export async function useFetchDepartmentList(
  departmentList: Ref<ApiResponse.CommonItem[]>
): Promise<void> {
  const [err, data] = await fetchDepartmentList<ApiResponse.CommonItem[]>();
  if (data) {
    departmentList.value = data;
  }
  if (data === null) {
    departmentList.value = [];
  }
}

export async function useFetchRoleList(
  roleList: Ref<ApiResponse.CommonItem[]>
): Promise<void> {
  const [err, data] = await fetchRoleList<ApiResponse.CommonItem[]>();
  if (data) {
    roleList.value = data;
  }
  if (data === null) {
    roleList.value = [];
  }
}
