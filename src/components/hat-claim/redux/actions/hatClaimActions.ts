import { ReduxActionTypes, ReduxBaseAction } from '../../../../redux/actions/rootActions';

export interface ReduxEditHatClaimAction extends ReduxBaseAction {
  name: string;
  value: string | boolean;
}

export interface ReduxEditPasswordHatClaimAction extends ReduxBaseAction {
  name: string;
  value: string | boolean | object;
}

export interface ReduxEditErrorMsgHatClaimAction extends ReduxBaseAction {
  message: string;
}

export interface ReduxEdiCurrentStepHatClaimAction extends ReduxBaseAction {
  step: number;
}

export function editHatClaim(name: string, value: string | boolean): ReduxEditHatClaimAction {
  return {
    type: ReduxActionTypes.EDIT_HAT_CLAIM,
    name,
    value,
  };
}

export function setCurrentStep(step: number): ReduxEdiCurrentStepHatClaimAction {
  return {
    type: ReduxActionTypes.EDIT_CURRENT_STEP,
    step,
  };
}

export function editHatClaimPassword(name: string, value: string | boolean | object): ReduxEditPasswordHatClaimAction {
  return {
    type: ReduxActionTypes.EDIT_HAT_PASSWORD,
    name,
    value,
  };
}

export function editHatClaimErrorMessage(message: string): ReduxEditErrorMsgHatClaimAction {
  return {
    type: ReduxActionTypes.EDIT_HAT_CLAIM_ERROR_MSG,
    message,
  };
}
