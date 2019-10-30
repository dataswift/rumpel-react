import { ReduxActionTypes } from "../../../../../redux/actions/rootActions";
import { ReduxEditHatClaimAction } from "../../actions/hatClaimActions";
import hatClaimReducer from "../hatClaimReducer";

it('handles actions of type EDIT_HAT_CLAIM', () => {
  const action: ReduxEditHatClaimAction = {
    type: ReduxActionTypes.EDIT_HAT_CLAIM,
    name: 'hatName',
    value: 'testing'
  };

  const newState = hatClaimReducer(undefined, action);

  expect(newState.hatName).toEqual('testing');
});
