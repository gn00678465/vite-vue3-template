export enum EnumLicenseFormType {
  'Formal' = 'components.licenseForm.type.Formal',
  'POC' = 'components.licenseForm.type.POC',
  'FunctionModule' = 'components.licenseForm.type.FunctionModule'
}

export enum EnumLicenseFormState {
  'Cancel' = '已撤回',
  'Reject' = '已駁回',
  'ManagerCheck' = '業務主管審核中',
  'FinalCheck' = 'FAE 主管審核中',
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
