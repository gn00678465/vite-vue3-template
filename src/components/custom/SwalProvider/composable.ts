import { useDialogApiInject } from './context';
import type { ISwalDialogApi } from './SwalProvider';

export function useSwalDialog() {
  const result = useDialogApiInject() as ISwalDialogApi;
  if (!result) {
    throw new Error('outer SwalProvider not found.');
  }
  return result;
}
