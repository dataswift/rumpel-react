import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HatTokenValidation, JWTDecoded } from '@dataswift/hat-js/lib/utils/HatTokenValidation';
import { isFuture, toDate, addDays } from 'date-fns';
import Cookies from 'js-cookie';
import { config } from '../../app.config';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { PdaLookupResponse } from '../../types/Hatters';
import { pdaLookupWithEmail } from '../../services/HattersService';

export enum AuthState {
  LOGIN_REQUEST = 'login_request',
  LOGIN_FAILED = 'login_failed',
}

export type AuthenticationState = {
  isAuthenticated: boolean;
  authState: AuthState;
  rememberMe: boolean;
  hatName: string;
  pdaLookupResponse?: PdaLookupResponse | null;
  pdaLookupResponseError: boolean;
  hatDomain: string;
  token?: string | null;
};

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  authState: AuthState.LOGIN_REQUEST,
  rememberMe: false,
  pdaLookupResponseError: false,
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
    setPdaLookupResponse: (state, action: PayloadAction<PdaLookupResponse | null>) => {
      state.pdaLookupResponseError = false;
      state.pdaLookupResponse = action.payload;
    },
    setPdaLookupResponseError: (state, action: PayloadAction<boolean>) => {
      state.pdaLookupResponseError = action.payload;
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

export const {
  authenticateWithToken,
  updateHatName,
  loginAuthState,
  setPdaLookupResponse,
  setPdaLookupResponseError,
  logout,
} = slice.actions;

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
          dispatch(updateHatName({ hatName, hatDomain }));
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
  window.localStorage.removeItem('session_email');
  Cookies.remove('token', { secure, sameSite: 'strict' });
  hatSvc.logout();

  dispatch(logout());
};

const tokenIsValid = (decodedToken: JWTDecoded): boolean => {
  const expiryDate = toDate(decodedToken.exp * 1000);
  const issuedDate = toDate(decodedToken.iat * 1000);

  const scopeIsValid =
    decodedToken.application === config.tokenApp || decodedToken.accessScope === 'owner';
  const tokenDomain = decodedToken.iss?.slice(decodedToken.iss.indexOf('.')) || '';
  const domainIsValid = config.supportedDomains.indexOf(tokenDomain) > -1;
  const portIsValid = new RegExp(`^[w.]+:${config.supportedPorts.join('|')}$`, 'gi').test(
    tokenDomain,
  );
  const notExpired = isFuture(expiryDate) && isFuture(addDays(issuedDate, config.tokenExpiryTime));

  return scopeIsValid && (domainIsValid || portIsValid) && notExpired;
};

export const getPdaLookupDetails =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await pdaLookupWithEmail(email);

      if (res.parsedBody) {
        dispatch(setPdaLookupResponse(res.parsedBody));
      }
    } catch (e) {
      dispatch(setPdaLookupResponse(null));
      dispatch(setPdaLookupResponseError(true));
    }
  };

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.authentication.token;
export const selectUserHatName = (state: RootState) => state.authentication.hatName;
export const selectUserHatDomain = (state: RootState) => state.authentication.hatDomain;
export const selectUserPdaLookupDetails = (state: RootState) =>
  state.authentication.pdaLookupResponse;
export const selectUserPdaLookupResponseError = (state: RootState) =>
  state.authentication.pdaLookupResponseError;

export default slice.reducer;
