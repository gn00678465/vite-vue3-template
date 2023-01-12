export default {
  present: {
    state: {
      ManagerCheck: '業務主管審核中',
      FinalCheck: 'FAE 主管審核中',
      'Finish(WaitingForSerial)': '等待序號',
      Reject: '駁回',
      Create: '建立',
      Cancel: '撤回',
      Finish: '完成'
    }
  },
  past: {
    state: {
      ManagerCheck: '業務主管已審核',
      FinalCheck: 'FAE主管已審核',
      'Finish(WaitingForSerial)': '等待序號',
      Reject: '已駁回',
      Create: '已建立',
      Cancel: '已撤回',
      Finish: '已完成'
    }
  },
  type: {
    Formal: '正式',
    POC: 'POC',
    FunctionModule: '功能模組'
  },
  modules: {
    Gcb: 'GCB',
    Deployment: '部署',
    Vulnerability: '弱點',
    RemoteDesktop: '遠端桌面',
    AppBehavior: '軟體行為',
    Assets: '資產清冊',
    'CPE-Translate': 'CPE-轉換',
    NetworkScanner: '主機探查',
    'CPE-Fix': 'CPE-修補',
    FileStream: '智慧分流'
  },
  label: {
    ExpiredDate: '授權到期時間',
    WarrantyExpired: '保固到期時間',
    POCExplanation: '說明',
    POCReason: '原因'
  }
};
