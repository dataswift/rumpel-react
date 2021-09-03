import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatTokenValidation, JWTDecoded } from '@dataswift/hat-js/lib/utils/HatTokenValidation';
import { config } from '../../app.config';
import { isFuture, toDate, addDays } from 'date-fns';
import Cookies from 'js-cookie';
import { HatClientService } from '../../services/HatClientService';

export enum AuthState {
  LOGIN_REQUEST = 'login_request',
  LOGIN_FAILED = 'login_failed',
}

export type AuthenticationState = {
  isAuthenticated: boolean;
  authState: AuthState;
  rememberMe: boolean;
  hatName: string;
  hatDomain: string;
  token?: string | null;
};

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  authState: AuthState.LOGIN_REQUEST,
  rememberMe: false,
  hatName: '',
  hatDomain: '',
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticateWithToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    updateHatName: (state, action: PayloadAction<{ hatName: string; hatDomain: string }>) => {
      state.hatName = action.payload.hatName;
      state.hatDomain = action.payload.hatDomain;
    },
    loginAuthState: (state, actions: PayloadAction<AuthState>) => {
      state.authState = actions.payload;
    },
    logout: (state) => {
      state.authState = AuthState.LOGIN_REQUEST;
      state.hatName = '';
      state.hatDomain = '';
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { authenticateWithToken, updateHatName, loginAuthState, logout } = slice.actions;

export const loginWithToken =
  (token: string): AppThunk =>
    (dispatch) => {
      try {
        const decodedToken = HatTokenValidation.decodeToken(token);

        if (tokenIsValid(decodedToken)) {
          dispatch(authenticateWithToken(token));
          window.sessionStorage.setItem('token', token);
          if (decodedToken.iss) {
            const hatName = decodedToken.iss.substring(0, decodedToken.iss.indexOf('.'));
            const hatDomain = decodedToken.iss.substring(decodedToken.iss.indexOf('.'));
            dispatch(updateHatName({ hatName: hatName, hatDomain: hatDomain }));
          }
        } else {
          dispatch(loginAuthState(AuthState.LOGIN_FAILED));
        }
      } catch (e) {
        dispatch(loginAuthState(AuthState.LOGIN_FAILED));
      }
    };

export const logoutUser = (): AppThunk => (dispatch) => {
  const hatSvc = HatClientService.getInstance();
  const secure = window.location.protocol === 'https:';

  window.sessionStorage.removeItem('token');
  Cookies.remove('token', { secure: secure, sameSite: 'strict' });
  hatSvc.logout();

  dispatch(logout());
};

const tokenIsValid = (decodedToken: JWTDecoded): boolean => {
  const expiryDate = toDate(decodedToken['exp'] * 1000);
  const issuedDate = toDate(decodedToken['iat'] * 1000);

  const scopeIsValid = decodedToken['application'] === config.tokenApp || decodedToken['accessScope'] === 'owner';
  const tokenDomain = decodedToken['iss']?.slice(decodedToken['iss'].indexOf('.')) || '';
  const domainIsValid = config.supportedDomains.indexOf(tokenDomain) > -1;
  const portIsValid = new RegExp('^[w.]+:' + config.supportedPorts.join('|') + '$', 'gi').test(tokenDomain);
  const notExpired = isFuture(expiryDate) && isFuture(addDays(issuedDate, config.tokenExpiryTime));

  return scopeIsValid && (domainIsValid || portIsValid) && notExpired;
};

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.authentication.token;
export const selectUserHatName = (state: RootState) => state.authentication.hatName;
export const selectUserHatDomain = (state: RootState) => state.authentication.hatDomain;

export default slice.reducer;
