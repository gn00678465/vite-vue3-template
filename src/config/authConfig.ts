import { LogLevel } from '@azure/msal-browser';
import { useAzureConfig } from '@/composables';

const { clientId, tenantId } = useAzureConfig();

export const msalConfig = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    knownAuthorities: []
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error('error', message);
            return;
          case LogLevel.Info:
            console.info('info', message);
            return;
          case LogLevel.Verbose:
            console.debug('debug', message);
            return;
          case LogLevel.Warning:
            console.warn('warn', message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
};

export const loginRequest = {
  scopes: ['User.Read']
};
