import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import CustomAxiosInstance from './instance';

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}

export function createRequest(config: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(config);

  async function setRequest<T>(
    param: RequestParam
  ): Promise<AxiosResponse<T, any> | AxiosError<T, any>> {
    const { url } = param;
    const method = param.method || 'get';
    const { instance } = customInstance;
    const res = (await getResponse({
      instance,
      method,
      url,
      data: param.data,
      config: param.axiosConfig
    })) as AxiosResponse<T, any> | AxiosError<T, any>;
    return res;
  }

  function get<T>(url: string, config?: AxiosRequestConfig) {
    return setRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  function post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return setRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }

  function put<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return setRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  function patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return setRequest<T>({ url, method: 'patch', data, axiosConfig: config });
  }

  function handleDel<T>(url: string, config?: AxiosRequestConfig) {
    return setRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    patch,
    delete: handleDel
  };
}

async function getResponse({
  instance,
  method,
  url,
  data,
  config
}: RequestParam & {
  instance: AxiosInstance;
  config?: AxiosRequestConfig;
  method: RequestMethod;
}) {
  if (method === 'get' || method === 'delete') {
    const res = await instance[method](url, config);
    return res;
  } else {
    const res = await instance[method](url, data, config);
    return res;
  }
}
