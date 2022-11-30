import { request } from '../request';

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

export function fetchUserInfo(accessToken: string) {
  return request.post('api/web/userInfo', {
    AccessToken: accessToken
  });
}
