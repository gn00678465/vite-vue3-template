declare namespace Auth {
  type role = keyof typeof import('@/enum/business').EnumUserRole;

  interface UserInfo {
    ID: number;
    UserName: string;
    UserRole: role;
  }
}
