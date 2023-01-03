export default {
  app_title: 'License System',
  app_desc: 'License System',
  azure_login: 'Use Azure to login.',
  profile: 'Profile',
  logout: 'Logout',
  question_for_logout: 'Are you sure you want to log out?',
  login_success: 'Login success!',
  login_success_message: 'Welcome back',
  occur_error: 'An error occurs.',
  empty_describe: 'Empty data',
  api: {
    tokenExpired: 'AccessToken expired',
    refreshTokenExpired: 'Your session is time out, please login again!',
    noToken: 'Token not exist',
    tokenAbnormal: 'Token Abnormal',
    success: 'Success',
    error: 'Error',
    errMsg400: 'Bad Request!',
    errMsg401:
      'The user does not have permission (token, user name, password error)!',
    errMsg403: 'The user is authorized, but access is forbidden!',
    errMsg404: 'Network request error, the resource was not found!',
    errMsg405: 'Network request error, request method not allowed!',
    errMsg408: 'Network request timed out!',
    errMsg500: 'Server error, please contact the administrator!',
    errMsg501: 'The network is not implemented!',
    errMsg502: 'Network Error!',
    errMsg503:
      'The service is unavailable, the server is temporarily overloaded or maintained!',
    errMsg504: 'Network timeout!',
    errMsg505: 'The http version does not support the request!',
    // Error response by backend
    ApplicationformNotFound: 'Application form not found!',
    NoFormalApplicationform:
      'Formal application form not found or formal form not completed!',
    DuplicateModule: 'Module application duplicated!',
    CustomerExist: 'Customer already exist!'
  }
};
