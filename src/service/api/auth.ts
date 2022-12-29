import { request } from '../request';

// 廢棄
export function fetchLogin(userName: string, password: string) {
  return request.post('/api/web/oauth/microsoft/login', {
    userName,
    password
  });
}

// 廢棄
export function fetchLoginPage(RedirectUrl: string, State: string) {
  return request.post('/api/web/oauth/microsoft/login', {
    RedirectUrl,
    State
  });
}
// 廢棄
export function fetchLoginInfo(Code: string, RedirectUrl: string) {
  return request.post(
    `/api/web/oauth/microsoft/callback`,
    {
      RedirectUrl
    },
    { params: { code: Code } }
  );
}

/**
 * 取得 token & userInfo
 * @param accessToken Azure token
 */
export function fetchUserInfo<T>(accessToken: string) {
  return request.post<T>('/api/web/userInfo', {
    AccessToken: accessToken
  });
}

/** refreshToken */
export function fetchUpdateToken(refreshToken: string) {
  return request.post(
    '/api/web/exchange-token',
    {
      RefreshToken: refreshToken
    },
    {
      withCredentials: true
    }
  );
}

/**
 * 取得當前登入使用者權限
 */
export function fetchUserPermission<T>() {
  return request.get<T>('/api/web/userPermission');
}
