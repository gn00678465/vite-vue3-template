import { request } from '../request';

export function fetchUsersList<T>(from: number, size: number) {
  return request.get<T>(`/api/web/all-users/list?from=${from}&size=${size}`);
}

export function fetchDepartmentList<T>() {
  return request.get<T>('/api/web/department/list');
}

export function fetchRoleList<T>() {
  return request.get<T>('/api/web/role/list');
}

type UserRoleData = {
  UserId: number;
  RoleId: number;
};
export function setUserRole<T>(data: UserRoleData) {
  return request.put<T>('/api/web/user-role', data);
}

type UserDepartmentData = {
  UserId: number;
  DepartmentId: number;
};
export function setUserDepartment<T>(data: UserDepartmentData) {
  return request.put<T>('/api/web/user-department', data);
}
