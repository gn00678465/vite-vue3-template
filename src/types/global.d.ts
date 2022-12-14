declare interface Window {
  $loadingBar: import('naive-ui').LoadingBarApi;
  $notify: import('naive-ui').NotificationApi;
  $swalDialog: import('@/components/custom/SwalProvider').ISwalDialogApi;
}

declare namespace Common {
  type StrategyAction = [boolean, () => void];
  type StrategyActions =
    | StrategyAction[]
    | Map<StrategyAction[0], StrategyAction[1]>;
}
