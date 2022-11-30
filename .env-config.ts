const serviceEnv = {
  development: {
    url: 'https://192.168.1.13:443',
    urlPattern: '/api'
  },
  production: {
    url: 'http://localhost:8080',
    urlPattern: '/api'
  }
}

export function getServiceEnvConfig(mode: string) {
  return serviceEnv[mode]
}