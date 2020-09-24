import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from "../../services/HatClientService";
import { setErrorMessage } from "../hat-login/hatLoginSlice";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";

type ApplicationsState = {
  applications: HatApplication[];
  applicationsHmi?: HatApplicationContent;
  updatedAt?: string;
  expirationTime: number;
};

export const initialState: ApplicationsState = {
  applications: [],
  applicationsHmi: undefined,
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    apps: (state, action: PayloadAction<Array<HatApplication>>) => {
      state.applications.push(...action.payload);
    },
    appsHmi: (state, action: PayloadAction<HatApplicationContent>) => {
      state.applicationsHmi = action.payload;
    },
  },
});

export const { apps, appsHmi } = slice.actions;

export const setApps = (app: Array<HatApplication>): AppThunk => dispatch => {
  dispatch(apps(app));
};

export const setAppsHmi = (app: HatApplicationContent): AppThunk => dispatch => {
  dispatch(appsHmi(app));
};

export const selectApplications = (state: RootState) => state.applications.applications;
export const selectApplicationsHmi = (state: RootState) => state.applications.applicationsHmi;

export const getApplications = (): AppThunk => async dispatch => {
  try {
    const apps = await HatClientService.getInstance().getApplications();

    if (apps?.parsedBody) {
      dispatch(setApps(apps.parsedBody));
    }
  } catch (e) {

  }
};

export const getApplicationHmi = (applicationId: string): AppThunk => async dispatch => {
  try {
    const apps = await HatClientService.getInstance().getApplicationHmi(applicationId);

    if (apps?.parsedBody) {
      dispatch(setAppsHmi(apps.parsedBody));
    }
  } catch (e) {

  }
};

export const getApplicationsHmi = (parentAppId: string): AppThunk => async dispatch => {
  try {
    const apps = await HatClientService.getInstance().getApplicationsHmi(parentAppId);

    if (apps?.parsedBody) {
      dispatch(setApps(apps.parsedBody));
    }
  } catch (e) {
    dispatch(setErrorMessage('An error has occurred, please return to the previous page and try again.'));
  }
};

export default slice.reducer;
