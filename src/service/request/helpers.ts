import { AxiosRequestConfig, AxiosError } from 'axios';
import { handleAuth, getRefreshToken } from '@/utils';
import { useAuthStore } from '@/stores';
import { fetchUpdateToken } from '../api';

interface MaybeAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _queued?: boolean;
}

interface TokenData {
  AccessToken: string;
  RefreshToken: string;
}

interface Queue {
  resolve: (arg: unknown) => void;
  reject: (arg: unknown) => void;
}

let isRefreshing = false;
const failedQueue: Queue[] = [];

function handleRefreshToken() {
  const refreshToken = getRefreshToken();
  const { updateToken } = useAuthStore();
  return new Promise((resolve, reject) => {
    fetchUpdateToken(refreshToken)
      .then((response) => {
        const [err, data] = response;
        if (data) {
          const { AccessToken, RefreshToken } = data as TokenData;
          updateToken(AccessToken, RefreshToken);
          resolve(data);
        }
        if (err) {
          reject(err);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const processQueue = (
  error: AxiosError | null,
  token: null | string = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
};

export default function (error: AxiosError) {
  const originalRequest = error.config as MaybeAxiosRequestConfig;

  if (originalRequest?._retry || originalRequest?._queued) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest._queued = true;
        handleAuth(originalRequest, token as string);
        return originalRequest;
      })
      .catch((err) => {
        return Promise.reject(error);
      });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  return new Promise((resolve, reject) => {
    handleRefreshToken
      .call(handleRefreshToken)
      .then((data: any) => {
        handleAuth(originalRequest, data.AccessToken);
        processQueue(null, data.AccessToken);
        resolve(originalRequest);
      })
      .catch((err) => {
        processQueue(err, null);
        reject(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
}
