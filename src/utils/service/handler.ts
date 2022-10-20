import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export function handleServiceResult<T>(error: any, data: T) {
  if (error) return [error];
  return [null, data];
}

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
