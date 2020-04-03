import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { get } from '../../services/BackendService';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from '../../services/HatClientService';

type ApplicationsState = {
  parentApp: HatApplication | null;
  dependencyApps: HatApplication[];
  updatedAt?: string;
  errorMessage?: string;
  expirationTime: number;
};

const initialState: ApplicationsState = {
  parentApp: null,
  dependencyApps: [],
  expirationTime: 5,
  errorMessage: '',
};

export const slice = createSlice({
  name: 'hatLogin',
  initialState,
  reducers: {
    parentApp: (state, action: PayloadAction<HatApplication>) => {
      console.log(action.payload);
      state.parentApp = action.payload;
    },
    dependencyApps: (state, action: PayloadAction<Array<HatApplication>>) => {
      state.dependencyApps.push(...action.payload);
    },
    errorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { parentApp, dependencyApps, errorMessage } = slice.actions;

export const setParentApp = (app: HatApplication): AppThunk => (dispatch) => {
  console.log(app);

  dispatch(parentApp(app));
};

export const setDependencyApps = (app: Array<HatApplication>): AppThunk => (dispatch) => {
  dispatch(dependencyApps(app));
};

export const setErrorMessage = (msg: string): AppThunk => (dispatch) => {
  dispatch(errorMessage(msg));
};

export const selectParentApp = (state: RootState) => state.hatLogin.parentApp;
export const selectDependencyApps = (state: RootState) => state.hatLogin.dependencyApps;
export const selectErrorMessage = (state: RootState) => state.hatLogin.errorMessage;

export const getApplications = (parentAppId: string, dependencies?: string[]): AppThunk => async (dispatch) => {
  try {
    const apps = await HatClientService.getInstance().getApplicationHmi(parentAppId);

    if (apps?.parsedBody) {
      const parentApp = apps.parsedBody.find((app) => app.application.id === parentAppId);

      if (parentApp) {
        dispatch(setParentApp(parentApp));
      } else {
        dispatch(setErrorMessage('ERROR: App details incorrect. Please contact the app developer and let them know.'));
      }

      if (dependencies) {
        const parentDependencies = parentApp?.application.setup.dependencies || [];

        const dependencyApps = apps.parsedBody.filter((app) => parentDependencies?.indexOf(app.application.id) !== -1);

        dispatch(setDependencyApps(dependencyApps));
      }
    }
  } catch (e) {
    dispatch(setErrorMessage('ERROR: Something went wrong. Please contact the app developer and let them know.'));
  }
};

export const setupApplication = (parentAppId: string): AppThunk => async (dispatch) => {
  try {
    const app = await HatClientService.getInstance().setupApplication(parentAppId);

    if (app.parsedBody) {
      return dispatch(setParentApp(app.parsedBody));
    }
  } catch (e) {
    console.log(e);
  }
};

export default slice.reducer;
