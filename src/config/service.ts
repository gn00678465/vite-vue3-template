export const ERROR_STATUSCODE = new Map<number | 'default', string>([
  [400, '錯誤的請求'],
  [401, '拒絕存取'],
  [403, '拒絕訪問'],
  [404, '請求的資源不存在'],
  [405, '請求方法不受允許'],
  [408, '請求逾時'],
  [500, '內部伺服器錯誤'],
  [501, '標頭值指定未實作的設定'],
  [502, '錯誤閘道'],
  [503, '服務無法使用'],
  [504, '閘道逾時'],
  [505, '不支援的 HTTP 版本'],
  ['default', '未知的錯誤']
]);

export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED';

export const REQUEST_TIMEOUT_MSG = '請求逾時';

export const NETWORK_ERROR_CODE = 'Network Error';

export const NETWORK_ERROR_MSG = '網路不可用';
