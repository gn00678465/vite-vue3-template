export interface AppInfo {
  name: string;
  title: string;
  desc: string;
}

export interface AzureConfig {
  clientId: string;
  tenantId: string;
}

export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME, VITE_APP_TITLE, VITE_APP_DESC } = import.meta.env;
  return {
    name: VITE_APP_NAME,
    title: VITE_APP_TITLE,
    desc: VITE_APP_DESC
  };
}

export function useAzureConfig(): AzureConfig {
  const { VITE_AZURE_CLIENT_ID, VITE_AZURE_TENANT_ID } = import.meta.env;
  return {
    clientId: VITE_AZURE_CLIENT_ID,
    tenantId: VITE_AZURE_TENANT_ID
  };
}
