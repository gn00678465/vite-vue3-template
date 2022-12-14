declare namespace Service {
  interface RequestError {
    code: number | string;
    message: string;
  }

  interface ResponseError {
    Status: string;
    Message: string;
  }

  type SuccessResult<T> = [null, T];

  type FailedResult = [RequestError, null];

  type RequestResult<T = any> = SuccessResult<T> | ErrorResult;

  type CommonItem = {
    ID: number;
    Name: string;
  };

  interface CustomItem {
    CustomerId: number;
    Customer: string;
    CRMUrl: string;
  }
}
