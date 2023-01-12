export type ApplyModule = {
  Module: number;
  Date?: string;
};

export type FormValue = {
  SaleId: number | null;
  CustomerId: number | null;
  ApplyModule: ApplyModule[];
  ExpiredDate: string | null;
  WarrantyExpired: string | null;
  TestDays: number;
  PerSeat: number;
  Images?: string;
};

export type FormType = keyof typeof import('@/enum').EnumLicenseFormType;

export type OmitPOC<T> = Omit<T, 'ExpiredDate' | 'Images'>;
export type OmitFormal<T> = Omit<T, 'TestDays' | 'PerSeat' | 'Images'>;

export type UploadImage = {
  ApplicationformId: number;
  Images: string;
};

export type SuccessResponse = {
  ApplicationformId?: number;
  Status: 'Success';
};

export interface ResponseFormValue {
  ApplicationFormId: number;
  ApplyModule: ApplyModule[];
  CRMUrl: string;
  CreateTime: string;
  Customer: string;
  PerSeat?: number;
  Sale: string;
  State: string;
  TestDays?: number;
  Type: string;
  FinalCheck?: string;
  ManagerCheck?: string;
}

export interface ResponseData {
  Items: ResponseFormValue;
  Images?: string;
}
