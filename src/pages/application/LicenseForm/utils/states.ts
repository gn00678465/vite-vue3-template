import {
  sendReject,
  sendRevoke,
  sendManagerAgree,
  sendApprovalAgree,
  sendFormFinish
} from '@/service/api';

const SIGN_OFF_STATES = {
  ManagerCheck: 'ManagerCheck',
  FinalCheck: 'FinalCheck',
  Finish_WaitingForSerial: 'Finish(WaitingForSerial)',
  Finish: 'Finish',
  Cancel: 'Cancel',
  Reject: 'Reject'
};

const SIGN_OFF_EVENT = {
  Submit: 'Submit',
  Cancel: 'Cancel',
  Reject: 'Reject'
};

export const stateMachine = {
  context: {
    ApplicationFormId: 0
  },
  actions: {
    reject() {
      console.log('reject');
    },
    cancel() {
      console.log('cancel');
    }
  },
  states: {
    [SIGN_OFF_STATES.ManagerCheck]: {
      on: {
        [SIGN_OFF_EVENT.Submit]: {
          target: [SIGN_OFF_STATES.FinalCheck],
          actions: () => {
            console.log(`submit to ${SIGN_OFF_STATES.FinalCheck}`);
          }
        },
        [SIGN_OFF_EVENT.Cancel]: {
          target: [SIGN_OFF_STATES.Cancel],
          actions: 'cancel'
        },
        [SIGN_OFF_EVENT.Reject]: {
          target: [SIGN_OFF_STATES.Reject],
          actions: 'reject'
        }
      }
    },
    [SIGN_OFF_STATES.FinalCheck]: {
      on: {
        [SIGN_OFF_EVENT.Submit]: {
          target: [SIGN_OFF_STATES.Finish_WaitingForSerial],
          actions: () => {
            console.log(`submit to ${SIGN_OFF_STATES.Finish_WaitingForSerial}`);
          }
        },
        [SIGN_OFF_EVENT.Reject]: {
          target: [SIGN_OFF_STATES.Reject],
          actions: 'reject'
        }
      }
    },
    [SIGN_OFF_STATES.Finish_WaitingForSerial]: {
      on: {
        [SIGN_OFF_EVENT.Submit]: {
          target: [SIGN_OFF_STATES.Finish],
          actions: () => {
            console.log(`submit to ${SIGN_OFF_STATES.Finish}`);
          }
        }
      }
    },
    [SIGN_OFF_STATES.Finish]: {
      on: {}
    },
    [SIGN_OFF_STATES.Cancel]: {
      on: {}
    },
    [SIGN_OFF_STATES.Reject]: {
      on: {}
    }
  }
};
