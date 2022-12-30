import {
  createMachine,
  assign,
  EventType,
  MachineConfig,
  MachineOptions
} from 'xstate';
import { pipe, assoc, pick } from 'ramda';
import {
  postApplicationPOC,
  postApplicationFormal,
  uploadApplicationImage,
  postApplicationModule,
  sendReject,
  sendRevoke,
  sendManagerAgree,
  sendApprovalAgree,
  sendFormFinish
} from '@/service/api';
import { useRandomId } from '@/hooks';
import { omitFormal, omitPOC, FormValue, SuccessResponse, OmitPOC } from '.';

export const SIGN_OFF_STATES = {
  ManagerCheck: 'ManagerCheck',
  FinalCheck: 'FinalCheck',
  Finish_WaitingForSerial: 'Finish(WaitingForSerial)',
  Finish: 'Finish',
  Cancel: 'Cancel',
  Reject: 'Reject'
};

const enum OPERATE_STATE {
  Create = 'Create',
  Done = 'Done'
}

const SIGN_OFF_EVENT = {
  Next: 'Next',
  Cancel: 'Cancel',
  Reject: 'Reject',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  Submit: 'Submit'
};

interface Context {
  state: string;
  param?: unknown;
  actions?: {
    close: () => void;
    showMessage: (arg: unknown) => void;
  };
}

interface RejectParam {
  ApplicationformId: number;
  Reason: string;
}

type Event =
  | { type: 'Next'; param: any; actions?: any; data?: any }
  | { type: 'Cancel'; param: number; actions?: any; data?: any }
  | { type: 'Reject'; param: RejectParam; actions?: any; data?: any }
  | { type: 'UPDATE_CONTEXT'; value: any; data?: any }
  | { type: 'SubmitFormal'; param: FormValue; actions?: any; data?: any }
  | {
      type: 'SubmitPOC';
      param: FormValue | OmitPOC<FormValue>;
      actions?: any;
      data?: SuccessResponse;
    }
  | {
      type: 'SubmitModule';
      param: FormValue | OmitPOC<FormValue>;
      actions?: any;
      data?: SuccessResponse;
    };

const submitMachine: MachineConfig<Context, any, Event> = {
  id: 'submit',
  initial: 'wait',
  states: {
    wait: {
      on: {
        SubmitFormal: {
          target: 'formal',
          actions: assign({
            param: (context, event) => event.param,
            actions: (context, event) => event.actions
          })
        },
        SubmitPOC: {
          target: 'poc',
          actions: assign({
            param: (context, event) => event.param,
            actions: (context, event) => event.actions
          })
        },
        SubmitModule: {
          target: 'module',
          actions: assign({
            param: (context, event) => event.param,
            actions: (context, event) => event.actions
          })
        }
      }
    },
    formal: {
      invoke: {
        src: (context, event) => {
          return new Promise((resolve, reject) => {
            postApplicationFormal(omitFormal(context.param as FormValue)).then(
              ([err, data]) => {
                if (data) {
                  resolve(data);
                }
                if (err) {
                  reject(err);
                }
              }
            );
          });
        },
        onDone: {
          target: 'finish',
          actions: ['handleSuccess']
        },
        onError: {
          target: 'wait',
          actions: ['handleError']
        }
      }
    },
    poc: {
      invoke: {
        src: (context, event) => {
          return new Promise((resolve, reject) => {
            postApplicationPOC<OmitPOC<FormValue>, SuccessResponse>(
              omitPOC(context.param as FormValue)
            ).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          target: 'uploadImg'
        },
        onError: {
          target: 'wait',
          actions: ['handleError']
        }
      }
    },
    module: {
      invoke: {
        src: (context, event) => {
          return new Promise((resolve, reject) => {
            postApplicationModule<OmitPOC<FormValue>, SuccessResponse>(
              omitPOC(context.param as FormValue)
            ).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          target: 'uploadImg'
        },
        onError: {
          target: 'wait',
          actions: ['handleError']
        }
      }
    },
    uploadImg: {
      invoke: {
        src: (context, event) => {
          return new Promise((resolve, reject) => {
            if ((context.param as FormValue)?.Images) {
              if (event?.data?.ApplicationformId) {
                const { ApplicationformId } = event.data;
                const param = pipe(
                  pick(['Images']),
                  assoc('ApplicationformId', ApplicationformId)
                )(context.param);
                uploadApplicationImage(param).then(([err, data]) => {
                  if (data) {
                    resolve(data);
                  }
                  if (err) {
                    reject(err);
                  }
                });
              }
            } else {
              resolve(event.data);
            }
          });
        },
        onDone: {
          target: 'finish',
          actions: ['handleSuccess']
        },
        onError: {
          target: 'uploadImg',
          actions: ['handleError']
        }
      }
    },
    finish: {}
  }
};

const approvalMachine = (
  api: (arg: number) => Promise<Service.RequestResult<any>>
): MachineConfig<Context, any, Event> => ({
  id: 'approval',
  initial: 'wait',
  states: {
    wait: {
      on: {
        Next: {
          target: 'post',
          actions: assign({
            param: (context, event) => event.param,
            actions: (context, event) => event.actions
          })
        }
      }
    },
    post: {
      invoke: {
        src: (context, event) => {
          return new Promise((resolve, reject) => {
            api(context.param as number).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          actions(context, event) {
            context.actions?.close?.();
          }
        },
        onError: {
          target: 'wait',
          actions(context, event) {
            console.log(event);
            context.actions?.showMessage?.(event.data);
          }
        }
      }
    },
    finish: {}
  }
});

const serialNumberMachine: MachineConfig<Context, any, Event> = {
  id: 'serialNumber',
  initial: 'wait',
  states: {
    wait: {
      on: {
        Next: {
          target: 'serialNumber',
          actions: assign({
            param: (context, event) => event.param,
            actions: (context, event) => event.actions
          })
        }
      }
    },
    serialNumber: {
      after: {
        5000: { target: 'complete' }
      }
    },
    complete: {
      invoke: {
        src: (context) => {
          return new Promise((resolve, reject) => {
            sendFormFinish(context.param as number).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          target: 'finish'
        },
        onError: {
          target: 'complete',
          actions: ['handleError']
        }
      }
    },
    finish: {
      entry: ['handleSuccess']
    }
  }
};

const stateMachineConfig: MachineConfig<Context, any, Event> = {
  id: useRandomId(4),
  initial: OPERATE_STATE.Create,
  predictableActionArguments: true,
  context: {
    state: '',
    param: null
  },
  states: {
    [OPERATE_STATE.Create]: {
      always: [
        { target: SIGN_OFF_STATES.ManagerCheck, cond: 'didStateManager' },
        { target: SIGN_OFF_STATES.FinalCheck, cond: 'didStateFinal' },
        {
          target: SIGN_OFF_STATES.Finish_WaitingForSerial,
          cond: 'didStateWaitSN'
        },
        { target: 'Done', cond: 'didStateFinish' },
        { target: 'Done', cond: 'didStateCancel' },
        { target: 'Done', cond: 'didStateReject' }
      ],
      on: {
        [SIGN_OFF_EVENT.Submit]: {
          target: [SIGN_OFF_STATES.ManagerCheck],
          actions: ['Submit']
        },
        [SIGN_OFF_EVENT.UPDATE_CONTEXT]: {
          actions: assign<Context, { type: EventType; value: Context }>(
            (context, event) => {
              return Object.assign(context, event.value);
            }
          )
        }
      },
      ...submitMachine
    },
    [SIGN_OFF_STATES.ManagerCheck]: {
      on: {
        [SIGN_OFF_EVENT.Cancel]: {
          target: [SIGN_OFF_STATES.Cancel],
          actions: ['Cancel']
        },
        [SIGN_OFF_EVENT.Reject]: {
          target: [SIGN_OFF_STATES.Reject],
          actions: ['Reject']
        }
      },
      ...approvalMachine(sendManagerAgree)
    },
    [SIGN_OFF_STATES.FinalCheck]: {
      on: {
        [SIGN_OFF_EVENT.Reject]: {
          target: [SIGN_OFF_STATES.Reject],
          actions: ['Reject']
        },
        [SIGN_OFF_EVENT.Cancel]: {
          target: [SIGN_OFF_STATES.Cancel],
          actions: ['Cancel']
        }
      },
      ...approvalMachine(sendApprovalAgree)
    },
    [SIGN_OFF_STATES.Finish_WaitingForSerial]: {
      on: {
        [SIGN_OFF_EVENT.Next]: {
          target: [SIGN_OFF_STATES.Finish]
        },
        [SIGN_OFF_EVENT.Cancel]: {
          target: [SIGN_OFF_STATES.Cancel],
          actions: ['Cancel']
        }
      },
      ...serialNumberMachine
    },
    [SIGN_OFF_STATES.Finish]: {},
    [SIGN_OFF_STATES.Cancel]: {
      invoke: {
        id: 'Cancel',
        src: (context) => {
          return new Promise((resolve, reject) => {
            sendRevoke(context.param as number).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          target: OPERATE_STATE.Done,
          actions: ['handleSuccess']
        },
        onError: {
          target: SIGN_OFF_STATES.ManagerCheck,
          actions: ['handleError']
        }
      }
    },
    [SIGN_OFF_STATES.Reject]: {
      invoke: {
        id: 'Reject',
        src: (context) => {
          return new Promise((resolve, reject) => {
            sendReject(context.param).then(([err, data]) => {
              if (data) {
                resolve(data);
              }
              if (err) {
                reject(err);
              }
            });
          });
        },
        onDone: {
          target: OPERATE_STATE.Done,
          actions: ['handleSuccess']
        },
        onError: {
          target: SIGN_OFF_STATES.ManagerCheck,
          actions: ['handleError']
        }
      }
    },
    [OPERATE_STATE.Done]: {
      type: 'final'
    }
  }
};

const stateMachineOptions: MachineOptions<Context, Event> = {
  actions: {
    Cancel: assign({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param: (context, event) => event.param,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      actions: (context, event) => event.actions
    }),
    Reject: assign({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param: (context, event) => event.param,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      actions: (context, event) => event.actions
    }),
    handleSuccess(context, event) {
      context.actions?.showMessage?.(event.data);
      context.actions?.close?.();
    },
    handleError(context, event) {
      context.actions?.showMessage?.(event.data);
    }
  },
  guards: {
    didStateManager(context) {
      return context.state === SIGN_OFF_STATES.ManagerCheck;
    },
    didStateFinal(context) {
      return context.state === SIGN_OFF_STATES.FinalCheck;
    },
    didStateWaitSN(context) {
      return context.state === SIGN_OFF_STATES.Finish_WaitingForSerial;
    },
    didStateFinish(context) {
      return context.state === SIGN_OFF_STATES.Finish;
    },
    didStateReject(context) {
      return context.state === SIGN_OFF_STATES.Reject;
    },
    didStateCancel(context) {
      return context.state === SIGN_OFF_STATES.Cancel;
    }
  }
};

export const initStateMachine = createMachine(
  stateMachineConfig,
  stateMachineOptions
);
