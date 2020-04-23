import { HatClaim } from '../../hat-claim.interface';
import { ReduxEditHatClaimAction } from '../actions/hatClaimActions';
import { ReduxActionTypes } from '../../../../redux/actions/rootActions';

const initHatClaim: HatClaim = {
  password: '',
  email: '',
  hatName: '',
  hatCluster: '',
  termsAgreed: false,
  optins: false,
};

type UserReducerActionsType = ReduxEditHatClaimAction;

export default function(state: HatClaim = initHatClaim, action: UserReducerActionsType) {
  if (action.type === ReduxActionTypes.EDIT_HAT_CLAIM) {
    return {
      ...state,
      [action.name]: action.value,
    };
  } else {
    return state;
  }
}
