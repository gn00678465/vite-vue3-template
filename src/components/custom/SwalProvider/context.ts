import { useContext } from '@/hooks';

const { useProvide: useDialogApiProvide, useInject: useDialogApiInject } =
  useContext('swalDialogApi');

export { useDialogApiProvide, useDialogApiInject };
