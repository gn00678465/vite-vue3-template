import { AxiosError, AxiosResponse } from 'axios';
import {
  ERROR_STATUSCODE,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG
} from '@/config';
import { execStrategyActions } from '../common';

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown>
  ? K
  : never;
type ErrorStatusCode = KeyOfMap<typeof ERROR_STATUSCODE>;

export function handleErrorStatusCode(error: AxiosError): AxiosError {
  const actions = new Map([
    [
      !window.navigator.onLine || error.message === NETWORK_ERROR_CODE,
      () => {
        const message = NETWORK_ERROR_MSG;
      }
    ],
    [
      error.code === REQUEST_TIMEOUT_CODE || error.message.includes('timeout'),
      () => {
        const message = REQUEST_TIMEOUT_MSG;
      }
    ],
    [
      Boolean(error.response),
      () => {
        const errorCode: ErrorStatusCode =
          (error.response?.status as ErrorStatusCode) || 'default';

        const message = ERROR_STATUSCODE.get(errorCode) as string;
      }
    ]
  ]);
  execStrategyActions(actions);
  return error;
}
