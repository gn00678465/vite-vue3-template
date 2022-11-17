import { mockRequest } from '../request';

export function useAuthApi() {
  function fetchLogin(userName: string, password: string) {
    return mockRequest.post('/login', { userName, password });
  }

  return {
    fetchLogin
  };
}
