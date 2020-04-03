import hatClaimCombinedReducer, {
  HatClaimState,
} from '../../components/hat-claim/redux/reducers/hatClaimCombinedReducer';
import { combineReducers } from 'redux';

interface RootReducerInterface {
  hatClaim: HatClaimState;
}

const rootReducer = combineReducers<RootReducerInterface>({
  hatClaim: hatClaimCombinedReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
