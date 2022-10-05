export interface AppInfo {
  name: string;
  title: string;
  desc: string;
}

export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME, VITE_APP_TITLE, VITE_APP_DESC } = import.meta.env;
  return {
    name: VITE_APP_NAME,
    title: VITE_APP_TITLE,
    desc: VITE_APP_DESC
  };
}
