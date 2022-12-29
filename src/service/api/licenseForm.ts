import { request } from '../request';

/** All */
export function fetchApplicationForm<T>(from: number, size: number) {
  return request.get<T>(
    `/api/web/applicationform-all/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormWaitingApproval<T>(
  from: number,
  size: number
) {
  return request.get<T>(
    `/api/web/applicationform-state-waitingApproval/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormReject<T>(from: number, size: number) {
  return request.get<T>(
    `/api/web/applicationform-state-reject/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormCancel<T>(from: number, size: number) {
  return request.get<T>(
    `/api/web/applicationform-state-cancel/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationWaitSN<T>(from: number, size: number) {
  return request.get<T>(
    `/api/web/applicationform-state-waitingSerialNumber/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFinish<T>(from: number, size: number) {
  return request.get<T>(
    `/api/web/applicationform-state-finish/list?from=${from}&size=${size}`
  );
}

/** 客戶申請單列表 */
export function fetchApplicationCustomer<T>(
  customerId: number,
  from: number,
  size: number
) {
  return request.get<T>(
    `/api/web/applicationform-customer/list?customer_id=${customerId}&from=${from}&size=${size}`
  );
}

/** */
export function fetchModelsList<T>() {
  return request.get<T>('/api/web/module/list');
}

/** 客戶 */
export function fetchCustomerList<T>(from: number, size: number) {
  return request.get<T>(`/api/web/customer/list?from=${from}&size=${size}`);
}
/** 新增客戶 */
export function setCustomer<T, K>(data: T) {
  return request.post<K>('/api/web/applicationform-customer', data);
}
/** 修改客戶資料 */
export function modCustomer<T, K>(data: T) {
  return request.put<K>('/api/web/applicationform-customer/mod', data);
}
/** 移除客戶 */
export function delCustomer<T>(customerId: number) {
  return request.delete<T>(
    `/api/web/applicationform-customer?customer_id=${customerId}`
  );
}

// 取得單筆表單資料
export function fetchSpecificApplicationForm<T>(formId: number) {
  return request.get<T>(
    `/api/web/applicationform-one/list?applicationform_id=${formId}`
  );
}

// 取得單筆表單簽核狀態
export function fetchSpecificFormRecord<T>(formId: number) {
  return request.get<T>(
    `/api/web/applicationform-state-record?applicationform_id=${formId}`
  );
}

// 申請表單
/**
 * 申請 POC 表單
 * @param data
 */
export function postApplicationPOC<T, K>(data: T) {
  return request.post<K>('/api/web/applicationform-type-poc', data);
}

/**
 * 申請正式表單
 * @param data
 */
export function postApplicationFormal<T, K>(data: T) {
  return request.post<K>('/api/web/applicationform-type-formal', data);
}

/**
 * 申請功能模組表單
 * @param data
 */
export function postApplicationModule<T, K>(data: T) {
  return request.post<K>('/api/web/applicationform-type-functionModule', data);
}

/**
 * 上傳申請單圖片
 * @param data
 */
export function uploadApplicationImage<T, K>(data: T) {
  return request.post<K>('/api/web/write/applicationform-image', data);
}

/**
 * 下載圖片
 * @param applicationFormId
 */
export function downloadApplicationImage(applicationFormId: number) {
  return request.get(
    `/api/web/read/applicationform-image?applicationform_id=${applicationFormId}`
  );
}

// 表單狀態切換
/** 駁回表單 */
export function sendReject<T, K>(data: T) {
  return request.put<K>('/api/web/applicationform-state-reject', data);
}

/** 撤回表單 */
export function sendRevoke<K>(applicationformId: number) {
  return request.put<K>(
    `/api/web/applicationform-state-cancel?applicationform_id=${applicationformId}`,
    undefined
  );
}

/** Sales 主管同意 */
export function sendManagerAgree<K>(applicationformId: number) {
  return request.put<K>(
    `/api/web/applicationform-state-pass?applicationform_id=${applicationformId}`,
    undefined
  );
}

/** FAE 主管同意 */
export function sendApprovalAgree<K>(applicationformId: number) {
  return request.put<K>(
    `/api/web/applicationform-state-waitingSerialNumber?applicationform_id=${applicationformId}`,
    undefined
  );
}

/** 表單完成 */
export function sendFormFinish<K>(applicationformId: number) {
  return request.put<K>(
    `/api/web/applicationform-state-finish?applicationform_id=${applicationformId}`,
    undefined
  );
}
