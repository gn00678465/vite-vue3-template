import { localStorage } from '@/utils';

export function getToken() {
  return localStorage.get('token', { crypto: true }) || '';
}

export function getRefreshToken() {
  return localStorage.get('refreshToken', { crypto: true }) || '';
}

export function filterWithoutPermission(routes: AuthRoute.Route[]) {
  return routes;
}
