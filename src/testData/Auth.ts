import { AuthenticationState, AuthState } from '../features/authentication/authenticationSlice';

const TEST_AUTH: AuthenticationState = {
  isAuthenticated: true,
  hatDomain: '.dataswift.dev',
  hatName: 'TestName',
  rememberMe: false,
  authState: AuthState.LOGIN_REQUEST,
  pdaLookupResponseError: false,
};

export default TEST_AUTH;
