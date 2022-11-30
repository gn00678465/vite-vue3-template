declare namespace StorageInterface {
  interface Local {
    token: string;
    refreshToken: string;
    userInfo: Auth.UserInfo;
  }
}
