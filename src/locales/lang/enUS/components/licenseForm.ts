export default {
  present: {
    state: {
      ManagerCheck: 'Manager Check',
      FinalCheck: 'FAE Check',
      'Finish(WaitingForSerial)': 'Waiting For Serial Number',
      Reject: 'Reject',
      Create: 'Create',
      Cancel: 'Cancel',
      Finish: 'Finish'
    }
  },
  past: {
    state: {
      ManagerCheck: 'Manager Checked',
      FinalCheck: 'FAE Checked',
      'Finish(WaitingForSerial)': 'Waiting For Serial Number',
      Reject: 'Rejected',
      Create: 'Created',
      Cancel: 'Cancelled',
      Finish: 'Finished'
    }
  },
  type: {
    Formal: 'Formal',
    POC: 'POC',
    FunctionModule: 'FunctionModule'
  },
  modules: {
    Gcb: 'Gcb',
    Deployment: 'Deployment',
    Vulnerability: 'Vulnerability',
    RemoteDesktop: 'RemoteDesktop',
    AppBehavior: 'AppBehavior',
    Assets: 'Assets',
    'CPE-Translate': 'CPE-Translate',
    NetworkScanner: 'NetworkScanner',
    'CPE-Fix': 'CPE-Fix',
    FileStream: 'FileStream'
  }
};
