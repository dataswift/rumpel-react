import hatClaimReducer from './hatClaimReducer';
import { combineReducers } from 'redux';
import hatClaimPasswordReducer, { ReduxHatClaimPasswordState } from './hatClaimPasswordReducer';
import hatClaimCurrentStepReducer from './hatClaimCurrentStepReducer';
import { HatClaim } from '../../hat-claim.interface';
import hatClaimErrorReducer from './hatClaimErrorReducer';

interface RootReducerInterface {
  hatClaim: HatClaim;
  currentStep: number;
  password: ReduxHatClaimPasswordState;
  errorMsg: string;
}

const hatClaimCombinedReducer = combineReducers<RootReducerInterface>({
  hatClaim: hatClaimReducer,
  currentStep: hatClaimCurrentStepReducer,
  password: hatClaimPasswordReducer,
  errorMsg: hatClaimErrorReducer,
});

export type HatClaimState = ReturnType<typeof hatClaimCombinedReducer>;

export default hatClaimCombinedReducer;
