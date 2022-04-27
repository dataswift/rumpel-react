import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatApplicationContent } from 'hmi/dist/interfaces/hat-application.interface';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { setErrorMessage } from '../hat-login/hatLoginSlice';

type ApplicationsState = {
  applications: HatApplication[];
  applicationHmi?: HatApplicationContent;
  applicationHmiState: string;
  updatedAt?: string;
  expirationTime: number;
};

export const initialState: ApplicationsState = {
  applications: [],
  applicationHmi: undefined,
  applicationHmiState: 'idle',
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    apps: (state, action: PayloadAction<Array<HatApplication>>) => {
      state.applications = action.payload;
    },
    appsHmi: (state, action: PayloadAction<HatApplicationContent>) => {
      state.applicationHmi = action.payload;
      state.applicationHmiState = 'completed';
    },
    appsHmiState: (state, action: PayloadAction<string>) => {
      state.applicationHmiState = action.payload;
    },
  },
});

export const { apps, appsHmi, appsHmiState } = slice.actions;

export const setApps =
  (app: Array<HatApplication>): AppThunk =>
  (dispatch) => {
    dispatch(apps(app));
  };

export const setAppsHmi =
  (app: HatApplicationContent): AppThunk =>
  (dispatch) => {
    dispatch(appsHmi(app));
  };

export const setAppsHmiState =
  (state: string): AppThunk =>
  (dispatch) => {
    dispatch(appsHmiState(state));
  };

export const selectApplications = (state: RootState) => state.applications.applications;
export const selectApplicationHmi = (state: RootState) => state.applications.applicationHmi;
export const selectApplicationHmiState = (state: RootState) =>
  state.applications.applicationHmiState;

export const getApplicationById =
  (appId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentApplications = getState().applications.applications;
    if (currentApplications.find((app) => app.application.id === appId)) return;

    try {
      const app = await HatClientService.getInstance().getApplicationById(appId);
      if (app.parsedBody) dispatch(setApps([...currentApplications, app.parsedBody]));
    } catch (e) {
      // TODO error handling
    }
  };

export const selectApplicationById = (id: string) =>
  createSelector(selectApplications, (apps) => apps.find((app) => app.application.id === id));

export const selectApplicationsByKind = (kind: string) =>
  createSelector(selectApplications, (apps) =>
    apps.filter((app) => app.application.kind.kind === kind),
  );

export const getApplications = (): AppThunk => async (dispatch, getState) => {
  try {
    const apps = await HatClientService.getInstance().getApplications();
    const currentApplications = getState().applications.applications;

    if (apps?.parsedBody && currentApplications.length !== apps.parsedBody.length) {
      dispatch(setApps(apps.parsedBody));
    }
  } catch (e) {
    // TODO Error handling
  }
};

export const getApplicationHmi =
  (applicationId: string, pda: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppsHmiState('pending'));
      const apps = await HatClientService.getInstance().getApplicationHmi(applicationId, pda);

      if (apps?.parsedBody) {
        dispatch(setAppsHmi(apps.parsedBody));
      }
    } catch (e) {
      dispatch(setAppsHmiState('error'));
    }
  };

export const getApplicationsHmi =
  (parentAppId: string): AppThunk =>
  async (dispatch) => {
    try {
      const apps = await HatClientService.getInstance().getApplicationsHmi(parentAppId);

      if (apps?.parsedBody) {
        dispatch(setApps(apps.parsedBody));
      }
    } catch (e) {
      dispatch(
        setErrorMessage('An error has occurred, please return to the previous page and try again.'),
      );
    }
  };

export const disableHatApplication =
  (appId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const app = await HatClientService.getInstance().disableApplication(appId);
      if (app?.parsedBody) {
        let currentApps = getState().applications.applications;
        currentApps = currentApps.filter((a) => a.application.id !== appId);
        currentApps.push(app.parsedBody);
        dispatch(setApps([...currentApps]));
      }
    } catch (e) {
      // TODO error handling
    }
  };

export default slice.reducer;
