import { ReduxActionTypes } from '../../../../../redux/actions/rootActions';
import { ReduxEdiCurrentStepHatClaimAction } from '../../actions/hatClaimActions';
import hatClaimCurrentStepReducer from '../hatClaimCurrentStepReducer';

it('handles actions of type EDIT_CURRENT_STEP', () => {
  const action: ReduxEdiCurrentStepHatClaimAction = {
    type: ReduxActionTypes.EDIT_CURRENT_STEP,
    step: 3,
  };

  const newState = hatClaimCurrentStepReducer(undefined, action);

  expect(newState).toEqual(3);
});
