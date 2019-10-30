import { ReduxEditPasswordHatClaimAction } from "../actions/hatClaimActions";
import { ReduxActionTypes } from "../../../../redux/actions/rootActions";

export interface ReduxHatClaimPasswordState {
    password: string;
    passwordConfirm: string;
    passwordStrength: { score: number };
    passwordMatch: boolean;
}

const initialState: ReduxHatClaimPasswordState = {
    password: '',
    passwordConfirm: '',
    passwordStrength: { score: 0 },
    passwordMatch: false,
};

type HatClaimPasswordReducerActionsType = ReduxEditPasswordHatClaimAction;

export default function(
    state: ReduxHatClaimPasswordState = initialState,
    action: HatClaimPasswordReducerActionsType,
) {
    if (action.type === ReduxActionTypes.EDIT_HAT_PASSWORD) {
        return {
            ...state,
            [action.name]: action.value
        };
    } else {
        return state;
    }
}
