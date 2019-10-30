export enum ReduxActionTypes {
    INIT_HAT_CLAIM = 'INIT_HAT_CLAIM',
    EDIT_HAT_CLAIM = 'EDIT_HAT_CLAIM',
    EDIT_HAT_PASSWORD = 'EDIT_HAT_PASSWORD',
    EDIT_CURRENT_STEP = 'EDIT_CURRENT_STEP'
}

export interface ReduxBaseAction {
    type: ReduxActionTypes;
}

