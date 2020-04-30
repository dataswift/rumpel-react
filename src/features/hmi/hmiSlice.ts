import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from '../../services/HatClientService';

type ApplicationsState = {
    parentApp: HatApplication | null;
    dependencyApps: HatApplication[];
};

export const initialState: ApplicationsState = {
  parentApp: null,
  dependencyApps: [],
};

export const slice = createSlice({
  name: 'hmi',
  initialState,
  reducers: {
    parentApp: (state, action: PayloadAction<HatApplication>) => {
      state.parentApp = action.payload;
    },
    dependencyApps: (state, action: PayloadAction<Array<HatApplication>>) => {
      state.dependencyApps.push(...action.payload);
    },
  },
});

export const { parentApp, dependencyApps } = slice.actions;

export const setParentApp = (app: HatApplication): AppThunk => dispatch => {
  dispatch(parentApp(app));
};

export const setDependencyApps = (app: Array<HatApplication>): AppThunk => dispatch => {
  dispatch(dependencyApps(app));
};

export const selectParentApp = (state: RootState) => state.hmi.parentApp;
export const selectDependencyApps = (state: RootState) => state.hmi.dependencyApps;


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
