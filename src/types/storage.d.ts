declare namespace StorageInterface {
  interface Local {
    token: string;
    refreshToken: string;
    userInfo: Auth.UserInfo;
    multiTabRoutes: App.GlobalTabRoute[];
    loginType: 'azure' | string;
  }
}
