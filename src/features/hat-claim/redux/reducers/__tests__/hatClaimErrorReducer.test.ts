import { ReduxActionTypes } from '../../../../../redux/actions/rootActions';
import { ReduxEditErrorMsgHatClaimAction } from '../../actions/hatClaimActions';
import hatClaimErrorReducer from '../hatClaimErrorReducer';

it('handles actions of type EDIT_HAT_CLAIM_ERROR_MSG', () => {
  const action: ReduxEditErrorMsgHatClaimAction = {
    type: ReduxActionTypes.EDIT_HAT_CLAIM_ERROR_MSG,
    message: 'Error message!',
  };

  const newState = hatClaimErrorReducer(undefined, action);

  expect(newState).toEqual('Error message!');
});
