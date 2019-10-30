import { ReduxEdiCurrentStepHatClaimAction } from "../actions/hatClaimActions";
import { ReduxActionTypes } from "../../../../redux/actions/rootActions";

type UserReducerActionsType = ReduxEdiCurrentStepHatClaimAction;

export default function(
    state: number = 0,
    action: UserReducerActionsType,
) {
    if (action.type === ReduxActionTypes.EDIT_CURRENT_STEP) {
        return action.step;
    } else {
        return state;
    }
}
