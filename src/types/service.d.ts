declare namespace Service {
  interface RequestError {
    code: number | string;
    message: string;
  }

  type SuccessResult<T> = [null, T];

  type FailedResult = [RequestError, null];

  type RequestResult<T = any> = SuccessResult<T> | ErrorResult;
}
