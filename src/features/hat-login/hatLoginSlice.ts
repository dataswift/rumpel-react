import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { setParentApp } from "../hmi/hmiSlice";

type ApplicationsState = {
    errorMessage?: string;
    redirectError: {
        error: string;
        errorReason: string;
    }
};

export const initialState: ApplicationsState = {
  errorMessage: '',
  redirectError: {
    error: '',
    errorReason: ''
  }
};

export const slice = createSlice({
  name: 'hatSetupLogin',
  initialState,
  reducers: {
    errorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    redirectError: (state, action: PayloadAction<{
      error: string;
      errorReason: string;
    }>) => {
      state.redirectError.error = action.payload.error;
      state.redirectError.errorReason = action.payload.errorReason;
    },
  },
});

export const { errorMessage, redirectError } = slice.actions;

export const setErrorMessage = (msg: string): AppThunk => dispatch => {
  dispatch(errorMessage(msg));
};

export const setRedirectError = (error: string, errorReason: string): AppThunk => dispatch => {
  dispatch(redirectError({ error, errorReason }));
};

export const selectErrorMessage = (state: RootState) => state.hatLogin.errorMessage;
export const selectRedirectError = (state: RootState) => state.hatLogin.redirectError;

export const onTermsAgreed = (parentAppId: string): AppThunk => async dispatch => {
  dispatch(setErrorMessage(''));

  return dispatch(setupApplication(parentAppId));
};

export const onTermsDeclined = (): AppThunk => async dispatch => {
  const hatSvc = HatClientService.getInstance();

  try {
    await hatSvc.sendReport('hmi_declined');
  } catch (e) {
    return `error ${ e }`;
  } finally {
    hatSvc.logout();
    dispatch(setRedirectError('access_denied', 'user_cancelled'));
  }
};

export const setupApplication = (parentAppId: string): AppThunk => async dispatch => {
  try {
    const app = await HatClientService.getInstance().setupApplication(parentAppId);

    if (app?.parsedBody) {
      return dispatch(setParentApp(app.parsedBody));
    }
  } catch (e) {
    dispatch(setErrorMessage('An error has occurred, please use the button below to return to the previous page, ' +
        'and try confirming again. If this error persists please contact:'));
  }
};

export default slice.reducer;
