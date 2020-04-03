import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export enum AuthState {
  LOGIN_IDLE = 'login_idle',
  LOGIN_REQUEST = 'login_request',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
}

type AuthenticationState = {
  isAuthenticated: boolean;
  authState: AuthState;
  rememberMe: boolean;
  token?: string | null;
};

const initialState: AuthenticationState = {
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

export const loginWithToken = (token: string): AppThunk => (dispatch) => {
  try {
    // dispatch(loginAuthState(AuthState.LOGIN_REQUEST));
    dispatch(authenticateWithToken(token));
    // dispatch(loginAuthState(AuthState.LOGIN_SUCCESS))
  } catch (e) {
    dispatch(loginAuthState(AuthState.LOGIN_FAILED));
  }
};

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.authentication.token;
export const selectAuthState = (state: RootState) => state.authentication.authState;

export default slice.reducer;
