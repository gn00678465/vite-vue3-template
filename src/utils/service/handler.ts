import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { transformRequestData } from './transform';

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
  if (
    /\/web\/userInfo/.test(config.url as string) ||
    /\/web\/exchange-token/.test(config.url as string)
  ) {
    return config;
  }
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export async function handleRequestHeader(
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  if (config.headers) {
    const contentType = config.headers['Content-Type'] as string;
    config.data = await transformRequestData(config.data, contentType);
  }
  return config;
}
