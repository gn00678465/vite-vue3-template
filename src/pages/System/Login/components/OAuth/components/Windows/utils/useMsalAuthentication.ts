import {
  AuthenticationResult,
  AuthError,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest,
  SilentRequest
} from '@azure/msal-browser';
import { Ref, ref, watch } from 'vue';
import { useMsal } from './useMsal';

type Request = PopupRequest | RedirectRequest | SilentRequest;

export interface MsalAuthenticationResult {
  acquireToken: (arg?: Request) => void;
  result: Ref<AuthenticationResult | null>;
  error: Ref<AuthError | null>;
  inProgress: Ref<boolean>;
}

export function useMsalAuthentication(
  interactionType: InteractionType,
  request: Request
): MsalAuthenticationResult {
  const { instance, inProgress } = useMsal();

  const localInProgress: Ref<boolean> = ref(false);
  const result: Ref<AuthenticationResult | null> = ref(null);
  const error: Ref<AuthError | null> = ref(null);

  const acquireToken = async function (requestOverride?: Request) {
    if (!localInProgress.value) {
      localInProgress.value = true;
      const tokenRequest = requestOverride || request;

      if (
        inProgress.value === InteractionStatus.Startup ||
        inProgress.value === InteractionStatus.HandleRedirect
      ) {
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            result.value = response;
            error.value = null;
            return;
          }
        } catch (e) {
          result.value = null;
          error.value = e as AuthError;
          return;
        }
      }

      try {
        const response = await instance.acquireTokenSilent(tokenRequest);
        result.value = response;
        error.value = null;
      } catch (e) {
        if (inProgress.value !== InteractionStatus.None) {
          return;
        }

        if (interactionType === InteractionType.Popup) {
          instance
            .loginPopup(tokenRequest)
            .then((response) => {
              result.value = response;
              error.value = null;
            })
            .catch((e) => {
              error.value = e;
              result.value = null;
            });
        } else if (interactionType === InteractionType.Redirect) {
          await instance.loginRedirect(tokenRequest).catch((e) => {
            error.value = e;
            result.value = null;
          });
        }
      }
      localInProgress.value = false;
    }
  };

  const stopWatcher = watch(inProgress, () => {
    if (!result.value && !error.value) {
      acquireToken();
    } else {
      stopWatcher();
    }
  });

  acquireToken();

  return {
    acquireToken,
    result,
    error,
    inProgress: localInProgress
  };
}
