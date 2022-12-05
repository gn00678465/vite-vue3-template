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
  handleNetworkError,
  handleResponseError,
  localStorage,
  showMessage
} from '@/utils';
import { AxiosCanceler } from '@/utils/service/cancel';
import handleRefreshToken from './helpers';
import { useAuthStore } from '@/stores';
import {
  TOKEN_EXPIRED_CODE,
  REFRESH_EXPIRED_CODE,
  WITHOUT_TOKEN_CODE
} from '@/config';

// interface IInterceptors<T = AxiosResponse> {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
//   requestInterceptorCatch?: (error: any) => any;
//   responseInterceptor?: (response: T) => T;
//   responseInterceptorCatch?: (error: any) => any;
// }
// interface IOption<T = AxiosResponse> {
//   interceptors?: IInterceptors<T>;
// }

export default class {
  instance: AxiosInstance;
  constructor(
    config: AxiosRequestConfig
    // option?: IOption
  ) {
    this.instance = Axios.create(config);
    this.setInterceptor();
    // option && this.setOptInterceptor(option);
  }

  setInterceptor() {
    // const axiosCanceler = new AxiosCanceler();

    this.instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        let handleConfig = { ...config };

        // 取消重複請求
        // axiosCanceler.addPending(handleConfig);

        // 處理 header
        handleConfig = await handleRequestHeader(handleConfig);
        // 處理 token
        handleConfig = handleAuth(
          handleConfig,
          localStorage.get('token') || ''
        );
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        // Do something with request error
        const error = handleNetworkError(axiosError);
        return handleServiceResult(error, null);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { status, data } = response;

        // axiosCanceler.removePending(response.config);

        if (status === 200 || status < 300 || status === 304) {
          if (data?.Status === 'Error') {
            return handleServiceResult(data, null);
          }
          return handleServiceResult(null, data);
        }
        handleResponseError(response);
        return handleServiceResult(null, response);
      },
      async (axiosError: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        const error = handleNetworkError(axiosError);

        const { Message } = axiosError?.response?.data as Service.ResponseError;
        const { resetAuthStore } = useAuthStore();

        switch (error.code) {
          case 401: {
            switch (Message) {
              case TOKEN_EXPIRED_CODE: {
                const config = await handleRefreshToken(axiosError);
                if (config) {
                  return this.instance.request(config);
                }
                break;
              }
              case REFRESH_EXPIRED_CODE: {
                Object.assign(error, { message: 'RefreshToken 過期' });
                resetAuthStore(true);
                break;
              }
              case WITHOUT_TOKEN_CODE: {
                Object.assign(error, { message: 'Token 未帶入' });
                resetAuthStore(true);
                break;
              }
            }
          }
        }

        showMessage(error);

        return handleServiceResult(error, null);
      }
    );
  }

  // setOptInterceptor(option: IOption) {
  //   this.instance.interceptors.request.use(
  //     option.interceptors?.requestInterceptor,
  //     option.interceptors?.requestInterceptorCatch
  //   );
  //   this.instance.interceptors.response.use(
  //     option.interceptors?.responseInterceptor,
  //     option.interceptors?.responseInterceptorCatch
  //   );
  // }
}
