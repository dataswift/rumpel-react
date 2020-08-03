import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from "../../services/HatClientService";
import { setErrorMessage } from "../hat-login/hatLoginSlice";

type ApplicationsState = {
  applications: HatApplication[];
  updatedAt?: string;
  expirationTime: number;
};

export const initialState: ApplicationsState = {
  applications: [],
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    apps: (state, action: PayloadAction<Array<HatApplication>>) => {
      state.applications.push(...action.payload);
    },
  },
});

export const { apps } = slice.actions;

export const setApps = (app: Array<HatApplication>): AppThunk => dispatch => {
  dispatch(apps(app));
};

export const selectApplications = (state: RootState) => state.applications.applications;

export const getApplications = (): AppThunk => async dispatch => {
  const apps = await HatClientService.getInstance().getApplications();

  if (apps?.parsedBody) {
    dispatch(setApps(apps.parsedBody));
  }
};

export const getApplicationsHmi = (parentAppId: string): AppThunk => async dispatch => {
  try {
    const apps = await HatClientService.getInstance().getApplicationHmi(parentAppId);

    if (apps?.parsedBody) {
      dispatch(setApps(apps.parsedBody));
    }
  } catch (e) {
    dispatch(setErrorMessage('An error has occurred, please return to the previous page and try again.'));
  }
};

export default slice.reducer;
