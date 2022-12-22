declare namespace ApiAuth {
  interface Token {
    AccessToken: string;
    RefreshToken: string;
  }

  type Status = '登入成功' | '登入失敗';

  type UserInfo = Auth.UserInfo;
}

declare namespace ApiResponse {
  type CommonItem = {
    ID: number;
    Name: string;
  };

  interface UserItem {
    UserId: number;
    Name: string;
    Department?: number;
    Role?: number;
  }

  interface CustomItem {
    CustomerId: number;
    Customer: string;
    CRMUrl: string;
  }

  interface CommonData<T> {
    Total: number;
    Items: Array<T>;
  }
}
