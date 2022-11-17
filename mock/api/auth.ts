import type { MockMethod } from 'vite-plugin-mock';
import { userModel } from '../model';

const apis: MockMethod[] = [
  {
    url: '/mock/login',
    method: 'post',
    response(options) {
      const { userName = undefined, password = undefined } = options.body;
      if (!userName || !password) {
        return {
          code: 10000,
          data: null
        };
      }

      const userItem = userModel.find((item) => item.UserName === userName);
      if (userItem) {
        return {
          code: 200,
          data: {
            status: 'success',
            data: userItem
          }
        };
      }
      return {
        code: 1000,
        data: {
          status: 'error',
          message: '用戶名稱不存在',
          data: null
        }
      };
    }
  }
];

export default apis;
