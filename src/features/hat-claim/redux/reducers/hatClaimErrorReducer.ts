import { ReduxEditErrorMsgHatClaimAction } from '../actions/hatClaimActions';
import { ReduxActionTypes } from '../../../../redux/actions/rootActions';

type UserReducerActionsType = ReduxEditErrorMsgHatClaimAction;

export default function hatClaimErrorReducer(state: string = '', action: UserReducerActionsType) {
  if (action.type === ReduxActionTypes.EDIT_HAT_CLAIM_ERROR_MSG) {
    return action.message;
  }
  return state;
}
