import { App, reactive } from 'vue';
import {
  EventMessage,
  EventMessageUtils,
  EventType,
  InteractionStatus,
  PublicClientApplication,
  AccountInfo
} from '@azure/msal-browser';

type AccountIdentifiers = Partial<
  Pick<AccountInfo, 'homeAccountId' | 'localAccountId' | 'username'>
>;

function accountArraysAreEqual(
  currentAccounts: Array<AccountIdentifiers>,
  accounts: Array<AccountIdentifiers>
): boolean {
  if (currentAccounts.length !== accounts.length) return false;
  const comparisonArray = [...accounts];

  return currentAccounts.every((elementA) => {
    const elementB = comparisonArray.shift();
    if (!elementA || !elementB) return false;
    return (
      elementA.homeAccountId === elementB.homeAccountId &&
      elementA.localAccountId === elementB.localAccountId &&
      elementA.username === elementB.username
    );
  });
}

export const msalPlugin = {
  install(app: App, msalInstance: PublicClientApplication) {
    const inProgress = InteractionStatus.Startup;
    const accounts = msalInstance.getAllAccounts();

    const state = reactive({
      instance: msalInstance,
      inProgress,
      accounts
    });

    app.config.globalProperties.$msal = state;

    msalInstance.addEventCallback((message: EventMessage) => {
      switch (message.eventType) {
        case EventType.ACCOUNT_ADDED:
        case EventType.ACCOUNT_REMOVED:
        case EventType.LOGIN_SUCCESS:
        case EventType.SSO_SILENT_SUCCESS:
        case EventType.HANDLE_REDIRECT_END:
        case EventType.LOGIN_FAILURE:
        case EventType.SSO_SILENT_FAILURE:
        case EventType.LOGOUT_END:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_FAILURE: {
          const currentAccounts = msalInstance.getAllAccounts();
          if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
            state.accounts = currentAccounts;
          }
          break;
        }
      }

      const status = EventMessageUtils.getInteractionStatusFromEvent(
        message,
        state.inProgress
      );

      if (status !== null) {
        state.inProgress = status;
      }
    });
  }
};
