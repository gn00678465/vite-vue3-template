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
  showMessage,
  execStrategyActions
} from '@/utils';
import { AxiosCanceler } from '@/utils/service/cancel';
import handleRefreshToken from './helpers';
import { useAuthStore } from '@/stores';
import {
  TOKEN_EXPIRED_CODE,
  REFRESH_EXPIRED_CODE,
  WITHOUT_TOKEN_CODE,
  TOKEN_ABNORMAL
} from '@/config';
import { useI18n } from '@/hooks';

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
    const { t } = useI18n();

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
        const { status } = response;

        // axiosCanceler.removePending(response.config);

        if (status === 200 || status < 300 || status === 304) {
          const error = handleResponseError(response);
          if (error) {
            return handleServiceResult(error, null);
          }
          return handleServiceResult(null, response.data);
        }
        return handleServiceResult(null, response);
      },
      async (axiosError: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        const error = handleNetworkError(axiosError);

        if (axiosError?.response) {
          const { Message } = axiosError?.response
            ?.data as Service.ResponseError;
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
                  (async () => {
                    Object.assign(error, {
                      message: t('sys.api.refreshTokenExpired')
                    });
                    resetAuthStore(true);
                  })();
                  break;
                }
                case WITHOUT_TOKEN_CODE: {
                  (async () => {
                    Object.assign(error, { message: t('sys.api.noToken') });
                    resetAuthStore(true);
                  })();
                  break;
                }
                case TOKEN_ABNORMAL: {
                  (async () => {
                    Object.assign(error, {
                      message: t('sys.api.tokenAbnormal')
                    });
                    resetAuthStore(true);
                  })();
                  break;
                }
              }
            }
          }
        }

        showMessage(error);

        return handleServiceResult(axiosError.response?.data, null);
      }
    );
  }
}
