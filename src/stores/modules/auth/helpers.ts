import { localStorage } from '@/utils';

export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    Username: '',
    UserId: 0
  };
  return localStorage.get('userInfo', { crypto: true }) || emptyInfo;
}

export function cleanAuthStorage() {
  localStorage.remove('token');
  localStorage.remove('refreshToken');
  localStorage.remove('userInfo');
  localStorage.remove('loginType');
}
