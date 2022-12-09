export enum EnumApplicationFormType {
  'Formal' = '正式申請單',
  'POC' = 'POC 申請單',
  'FunctionModule' = '功能模組申請單'
}

export enum EnumApplicationFormState {
  'Cancel' = '取消申請',
  'Reject' = '申請被拒',
  'ManagerCheck' = '主管審核中',
  'FinalCheck' = 'FAE 審核中',
  'Finish(WaitingForSerial)' = '完成(等待序號)',
  'Finish' = '完成'
}

export enum EnumFunctionModule {
  'Gcb' = 1,
  'Deployment' = 2,
  'Vulnerability' = 3,
  'RemoteDesktop' = 4,
  'AppBehavior' = 5,
  'Assets' = 6,
  'CPE-Translate' = 7,
  'NetworkScanner' = 8,
  'CPE-Fix' = 9,
  'FileStream' = 10
}
