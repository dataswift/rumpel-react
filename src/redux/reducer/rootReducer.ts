import { combineReducers } from 'redux';
import hatClaimCombinedReducer, {
  HatClaimState,
} from '../../features/hat-claim/redux/reducers/hatClaimCombinedReducer';

interface RootReducerInterface {
  hatClaim: HatClaimState;
}

const rootReducer = combineReducers<RootReducerInterface>({
  hatClaim: hatClaimCombinedReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
