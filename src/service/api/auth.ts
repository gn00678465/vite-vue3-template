import { request } from '../request';

export function useAuthApi() {
  function fetchLogin(userName: string, password: string) {
    return request.post('/posts', { userName, password });
  }

  return {
    fetchLogin
  };
}
