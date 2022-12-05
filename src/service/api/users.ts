import { request } from '../request';

export function fetchUsersList(from: number, size: number) {
  return request.get(`/api/web/all-users/list?from=${from}&size=${size}`);
}

export function fetchDepartmentList() {
  return request.get('/api/web/department/list');
}

export function fetchRoleList() {
  return request.get('/api/web/role/list');
}

export function fetchModelsList() {
  return request.get('/api/web/module/list');
}

type UserRoleData = {
  UserId: number;
  RoleId: number;
};
export function setUserRole(data: UserRoleData) {
  return request.put('/api/web/user-role', data);
}

type UserDepartmentData = {
  UserId: number;
  DepartmentId: number;
};
export function setUserDepartment(data: UserDepartmentData) {
  return request.put('/api/web/user-department', data);
}
