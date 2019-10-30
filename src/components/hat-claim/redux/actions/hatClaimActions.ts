import { ReduxActionTypes, ReduxBaseAction } from "../../../../redux/actions/rootActions";

export interface ReduxEditHatClaimAction extends ReduxBaseAction {
    type: ReduxActionTypes.EDIT_HAT_CLAIM;
    name: string;
    value: string | boolean;
}

export interface ReduxEditPasswordHatClaimAction extends ReduxBaseAction {
    type: ReduxActionTypes.EDIT_HAT_PASSWORD;
    name: string;
    value: string | boolean | object;
}

export interface ReduxEdiCurrentStepHatClaimAction extends ReduxBaseAction {
    type: ReduxActionTypes.EDIT_CURRENT_STEP;
    step: number;
}

export function editHatClaim(name: string, value: string | boolean): ReduxEditHatClaimAction {
    return {
        type: ReduxActionTypes.EDIT_HAT_CLAIM,
        name,
        value
    };
}

export function setCurrentStep(step: number): ReduxEdiCurrentStepHatClaimAction {
    return {
        type: ReduxActionTypes.EDIT_CURRENT_STEP,
        step
    };
}

export function editHatClaimPassword(name: string, value: string | boolean | object): ReduxEditPasswordHatClaimAction {
    return {
        type: ReduxActionTypes.EDIT_HAT_PASSWORD,
        name,
        value
    };
}