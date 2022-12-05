export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED';

export const REQUEST_TIMEOUT_MSG = '請求逾時';

export const NETWORK_ERROR_CODE = 'Network Error';

export const NETWORK_ERROR_MSG = '網路不可用';

export const DEFAULT_ERROR_CODE = 'DEFAULT';

export const DEFAULT_ERROR_MSG = '未知的錯誤';

// 401 錯誤碼
/** token 過期 */
export const TOKEN_EXPIRED_CODE = 'AccessToken expired';
/** refresh token 過期 */
export const REFRESH_EXPIRED_CODE = 'RefreshToken expired';
/** 未帶入 token */
export const WITHOUT_TOKEN_CODE = 'no token';

export const ERROR_STATUS_CODE = {
  400: '錯誤的請求',
  401: '拒絕存取',
  403: '拒絕訪問',
  404: '請求的資源不存在',
  405: '請求方法不受允許',
  408: '請求逾時',
  500: '內部伺服器錯誤',
  501: '標頭值指定未實作的設定',
  502: '錯誤閘道',
  503: '服務無法使用',
  504: '閘道逾時',
  505: '不支援的 HTTP 版本',
  [DEFAULT_ERROR_CODE]: DEFAULT_ERROR_MSG
};

// error message
export const ERROR_MSG_DURATION = 500;
