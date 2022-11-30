import { localStorage } from '@/utils';

export function getToken() {
  return localStorage.get('token') || '';
}

export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    Username: ''
  };
  return localStorage.get('userInfo') || emptyInfo;
}

export function cleanAuthStorage() {
  localStorage.remove('token');
  localStorage.remove('refreshToken');
  localStorage.remove('userInfo');
}
