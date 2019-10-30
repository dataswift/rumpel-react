export enum ReduxActionTypes {
    EDIT_HAT_CLAIM = 'EDIT_HAT_CLAIM',
    EDIT_HAT_PASSWORD = 'EDIT_HAT_PASSWORD',
    EDIT_CURRENT_STEP = 'EDIT_CURRENT_STEP',
    EDIT_HAT_CLAIM_ERROR_MSG = 'EDIT_HAT_CLAIM_ERROR_MSG'
}

export interface ReduxBaseAction {
    type: ReduxActionTypes;
}

