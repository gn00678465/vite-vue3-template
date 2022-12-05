import { createRequest } from './request';
import { getServiceEnvConfig } from '~/.env-config';

const { url, urlPattern } = getServiceEnvConfig(import.meta.env.MODE);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

const { protocol, host } = new URL(window.location.href);

export const request = createRequest({
  baseURL: isHttpProxy ? urlPattern : url,
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json; charset=UTF-8;' }
});
