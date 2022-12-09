import type { Ref } from 'vue';

interface Item {
  ID: number;
  Name: string;
}
export type List = Item[];

import { fetchDepartmentList, fetchRoleList } from '@/service/api';

export async function useFetchDepartmentList(
  departmentList: Ref<List>
): Promise<void> {
  const [err, data] = await fetchDepartmentList();
  if (data) {
    departmentList.value = data;
  }
  if (data === null) {
    departmentList.value = [];
  }
}

export async function useFetchRoleList(roleList: Ref<List>): Promise<void> {
  const [err, data] = await fetchRoleList();
  if (data) {
    roleList.value = data;
  }
  if (data === null) {
    roleList.value = [];
  }
}
