declare namespace ApiAuth {
  interface Token {
    AccessToken: string;
    RefreshToken: string;
  }

  type Status = '登入成功' | '登入失敗';

  type UserInfo = Auth.UserInfo;
}
