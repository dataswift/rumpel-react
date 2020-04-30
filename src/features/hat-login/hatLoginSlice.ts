import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { setParentApp } from "../hmi/hmiSlice";

type ApplicationsState = {
  errorMessage?: string;
};

export const initialState: ApplicationsState = {
  errorMessage: '',
};

export const slice = createSlice({
  name: 'hatLogin',
  initialState,
  reducers: {
    errorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { errorMessage } = slice.actions;

export const setErrorMessage = (msg: string): AppThunk => dispatch => {
  dispatch(errorMessage(msg));
};

export const selectErrorMessage = (state: RootState) => state.hatLogin.errorMessage;

export const setupApplication = (parentAppId: string): AppThunk => async dispatch => {
  try {
    const app = await HatClientService.getInstance().setupApplication(parentAppId);

    if (app?.parsedBody) {
      return dispatch(setParentApp(app.parsedBody));
    }
  } catch (e) {
    // todo error handling
    console.log(e);
  }
};

export default slice.reducer;
