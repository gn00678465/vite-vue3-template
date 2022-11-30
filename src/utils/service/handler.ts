import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

/**
 * 統一處理 axios result
 */
export function handleServiceResult<T>(error: any, data: T) {
  if (error) {
    return [error, null] as Service.FailedResult;
  }
  return [null, data] as Service.SuccessResult<T>;
}

/**
 * header 加入 token
 */
export function handleAuth(
  config: AxiosRequestConfig,
  token: string
): AxiosRequestConfig {
  if (config.headers) {
    config.headers.Authorization = token;
  }
  return config;
}

export function handleRequestHeader(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  return config;
}
