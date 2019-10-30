import hatClaimReducer  from "./hatClaimReducer";
import { combineReducers } from "redux";
import hatClaimPasswordReducer, { ReduxHatClaimPasswordState } from "./hatClaimPasswordReducer";
import hatClaimCurrentStepReducer  from "./hatClaimCurrentStepReducer";
import { HatClaim } from "../../hat-claim.interface";

interface RootReducerInterface {
    hatClaim: HatClaim;
    currentStep: number;
    password: ReduxHatClaimPasswordState;
}

const hatClaimCombinedReducer = combineReducers<RootReducerInterface>({
    hatClaim: hatClaimReducer,
    currentStep: hatClaimCurrentStepReducer,
    password: hatClaimPasswordReducer,
});

export type HatClaimState = ReturnType<typeof hatClaimCombinedReducer>;

export default hatClaimCombinedReducer;