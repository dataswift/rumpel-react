import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatTokenValidation, JWTDecoded } from '@dataswift/hat-js/lib/utils/HatTokenValidation';
import { config } from '../../app.config';
import { isFuture, toDate, addDays } from 'date-fns';

export enum AuthState {
  LOGIN_REQUEST = 'login_request',
  LOGIN_FAILED = 'login_failed',
}

type AuthenticationState = {
  isAuthenticated: boolean;
  authState: AuthState;
  rememberMe: boolean;
  token?: string | null;
};

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  authState: AuthState.LOGIN_REQUEST,
  rememberMe: false,
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticateWithToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    loginAuthState: (state, actions: PayloadAction<AuthState>) => {
      state.authState = actions.payload;
    },
  },
});

export const { authenticateWithToken, loginAuthState } = slice.actions;

export const loginWithToken = (token: string): AppThunk => dispatch => {
  try {
    if (tokenIsValid(HatTokenValidation.decodeToken(token))) {
      dispatch(authenticateWithToken(token));
      window.sessionStorage.setItem('token', token);
    } else {
      dispatch(loginAuthState(AuthState.LOGIN_FAILED));
    }
  } catch (e) {
    dispatch(loginAuthState(AuthState.LOGIN_FAILED));
  }
};

const tokenIsValid = (decodedToken: JWTDecoded): boolean => {
  const expiryDate = toDate(decodedToken['exp'] * 1000);
  const issuedDate = toDate(decodedToken['iat'] * 1000);

  // TODO remove the ts-ignore when hat-js will be updated
  // @ts-ignore
  const scopeIsValid = decodedToken['application'] === config.tokenApp || decodedToken['accessScope'] === 'owner';
  const tokenDomain = decodedToken['iss']?.slice(decodedToken['iss'].indexOf('.')) || '';
  const domainIsValid = config.supportedDomains.indexOf(tokenDomain) > -1;
  const portIsValid = new RegExp('^[w.]+:' + config.supportedPorts.join('|') + '$', 'gi').test(tokenDomain);
  const notExpired = isFuture(expiryDate) && isFuture(addDays(issuedDate, config.tokenExpiryTime));

  return scopeIsValid && (domainIsValid || portIsValid) && notExpired;
};

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.authentication.token;

export default slice.reducer;
