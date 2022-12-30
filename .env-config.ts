type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>

const serviceEnv: ServiceEnv = {
  development: {
    url: 'https://192.168.1.13:443',
    urlPattern: '/api'
  },
  production: {
    url: 'http://localhost:8080',
    urlPattern: '/api'
  }
};

export function getServiceEnvConfig(mode: ServiceEnvType) {
  return serviceEnv[mode];
}
