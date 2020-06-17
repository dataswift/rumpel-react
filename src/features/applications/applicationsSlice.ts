import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from "../../services/HatClientService";

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
    // dispatch(setErrorMessage('ERROR: Something went wrong. Please contact the app developer and let them know.'));
  }
};

export default slice.reducer;
