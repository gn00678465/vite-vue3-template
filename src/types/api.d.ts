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

  interface CustomItem {
    CustomerId: number;
    Customer: string;
    CRMUrl: string;
  }

  interface TableData<T> {
    Total: number;
    Items: Array<T>;
  }
}
