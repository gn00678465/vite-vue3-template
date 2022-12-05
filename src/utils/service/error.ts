import { AxiosError, AxiosResponse } from 'axios';
import {
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MSG,
  ERROR_STATUS_CODE
} from '@/config';
import { execStrategyActions } from '../common';

type ErrorStatusCode = keyof typeof ERROR_STATUS_CODE;

export function handleNetworkError(axiosErr: AxiosError) {
  const error: Service.RequestError = {
    code: DEFAULT_ERROR_CODE,
    message: DEFAULT_ERROR_MSG
  };
  const actions = new Map([
    [
      !window.navigator.onLine || axiosErr.message === NETWORK_ERROR_CODE,
      () => {
        Object.assign(error, {
          code: NETWORK_ERROR_CODE,
          message: NETWORK_ERROR_MSG
        });
      }
    ],
    [
      axiosErr.code === REQUEST_TIMEOUT_CODE ||
        axiosErr.message.includes('timeout'),
      () => {
        Object.assign(error, {
          code: REQUEST_TIMEOUT_CODE,
          message: REQUEST_TIMEOUT_MSG
        });
      }
    ],
    [
      Boolean(axiosErr.response),
      () => {
        const errorCode = (axiosErr.response?.status ||
          'DEFAULT') as ErrorStatusCode;

        Object.assign(error, {
          code: errorCode,
          message: ERROR_STATUS_CODE[errorCode] as string
        });
      }
    ]
  ]);
  execStrategyActions(actions);
  return error;
}

export function handleResponseError(res: AxiosResponse) {}
