declare namespace Service {
  interface RequestError {
    code: number | string;
    message: string;
  }

  interface ResponseSuccess<T = any> {
    Status: 'Success';
    data?: T;
  }

  interface ResponseError {
    Status: 'Error';
    Message: string;
  }

  type SuccessResult<T> = [null, T];

  type FailedResult = [ResponseError, null];

  type RequestResult<T = any> = SuccessResult<T> | FailedResult;
}
