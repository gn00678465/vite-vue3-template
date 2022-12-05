import { request } from '../request';

/** All */
export function fetchApplicationForm(from: number, size: number) {
  return request.get(
    `/api/web/applicationform-all/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormWaitingApproval(
  from: number,
  size: number
) {
  return request.get(
    `/api/web/applicationform-state-waitingApproval/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormReject(from: number, size: number) {
  return request.get(
    `/api/web/applicationform-state-reject/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFormCancel(from: number, size: number) {
  return request.get(
    `/api/web/applicationform-state-cancel/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationWaitSN(from: number, size: number) {
  return request.get(
    `/api/web/applicationform-state-waitingSerialNumber/list?from=${from}&size=${size}`
  );
}

export function fetchApplicationFinish(from: number, size: number) {
  return request.get(
    `/api/web/applicationform-state-finish/list?from=${from}&size=${size}`
  );
}

// 客戶
export function fetchCustomerList(from: number, size: number) {
  return request.get(`/api/web/customer/list?from=${from}&size=${size}`);
}

type Module = {
  Module: number;
  Date?: Date;
};

type Body = {
  CustomerID: number;
  ApplyModule: Module;
};

type POCBody = Body & {
  TestDays: number;
  PerSeat: number;
};
// 申請表單
/**
 * 申請 POC 表單
 * @param data
 */
export function postApplicationPOC(data: POCBody) {
  return request.post('/api/web/applicationform-type-poc', data);
}

type FormalBody = Body & {
  ExpiredDate: Date;
};
/**
 * 申請正式表單
 * @param data
 */
export function postApplicationFormal(data: FormalBody) {
  return request.post('/api/web/applicationform-type-formal', data);
}

type FunctionalModuleBody = Body & {
  TestDays: number;
  PerSeat: number;
};
/**
 * 申請功能模組表單
 * @param data
 */
export function postApplicationModule(data: FunctionalModuleBody) {
  return request.post('/api/web/applicationform-type-functionModule', data);
}

type UploadImageBody = {
  ApplicationformID: number;
  Images: string;
};
/**
 * 上傳申請單圖片
 * @param data
 */
export function uploadApplicationImage(data: UploadImageBody) {
  return request.post('/api/web/write/applicationform-image', data);
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
