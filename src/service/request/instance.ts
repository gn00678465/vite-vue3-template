import Axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import {
  handleServiceResult,
  handleAuth,
  handleRequestHeader,
  handleErrorStatusCode
} from '@/utils';

interface IInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
interface IOption<T = AxiosResponse> {
  interceptors?: IInterceptors<T>;
}

export default class {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig, option?: IOption) {
    this.instance = Axios.create(config);
    this.setInterceptor();
    option && this.setOptInterceptor(option);
  }

  setInterceptor() {
    this.instance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        let handleConfig = { ...config };
        // 處理 header
        handleConfig = handleRequestHeader(handleConfig);
        // 處理 token
        handleConfig = handleAuth(handleConfig, 'token');
        return handleConfig;
      },
      function (error: AxiosError) {
        // Do something with request error
        error = handleErrorStatusCode(error);
        return handleServiceResult(error, null);
      }
    );

    this.instance.interceptors.response.use(
      function (response) {
        const { status, data, config } = response;
        if (status === 200 || status < 300 || status === 304) {
          return handleServiceResult(null, data);
          // refresh token here
        }
        return response;
      },
      function (error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        error = handleErrorStatusCode(error);
        return handleServiceResult(error, null);
      }
    );
  }

  setOptInterceptor(option: IOption) {
    this.instance.interceptors.request.use(
      option.interceptors?.requestInterceptor,
      option.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      option.interceptors?.responseInterceptor,
      option.interceptors?.responseInterceptorCatch
    );
  }
}
