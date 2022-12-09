import { localStorage } from '@/utils';

export function getToken() {
  return localStorage.get('token') || '';
}

export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    Username: '',
    UserId: 0
  };
  return localStorage.get('userInfo') || emptyInfo;
}

export function cleanAuthStorage() {
  localStorage.remove('token');
  localStorage.remove('refreshToken');
  localStorage.remove('userInfo');
  localStorage.remove('loginType');
}
