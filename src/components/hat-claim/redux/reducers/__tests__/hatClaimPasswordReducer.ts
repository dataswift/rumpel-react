import { ReduxActionTypes } from '../../../../../redux/actions/rootActions';
import { ReduxEditPasswordHatClaimAction } from '../../actions/hatClaimActions';
import hatClaimPasswordReducer from '../hatClaimPasswordReducer';

it('handles actions of type EDIT_HAT_PASSWORD', () => {
  const action: ReduxEditPasswordHatClaimAction = {
    type: ReduxActionTypes.EDIT_HAT_PASSWORD,
    name: 'password',
    value: 'testing',
  };

  const newState = hatClaimPasswordReducer(undefined, action);

  expect(newState.password).toEqual('testing');
});

it('handles actions with value Object', () => {
  const action: ReduxEditPasswordHatClaimAction = {
    type: ReduxActionTypes.EDIT_HAT_PASSWORD,
    name: 'passwordStrength',
    value: { score: 2 },
  };

  const newState = hatClaimPasswordReducer(undefined, action);

  expect(newState.passwordStrength.score).toEqual(2);
});
