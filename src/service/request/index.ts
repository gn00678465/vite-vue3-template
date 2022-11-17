import { createRequest } from './request';

export const request = createRequest({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export const mockRequest = createRequest({ baseURL: '/mock' });
