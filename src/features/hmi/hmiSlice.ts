import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatTool } from '../tools/hat-tool.interface';

type ApplicationsState = {
  parentApp: HatApplication | null;
  dependencyApps: HatApplication[];
  dependencyTools: HatTool[];
};

export const initialState: ApplicationsState = {
  parentApp: null,
  dependencyApps: [],
  dependencyTools: [],
};

export const slice = createSlice({
  name: 'hmi',
  initialState,
  reducers: {
    parentApp: (state, action: PayloadAction<HatApplication>) => {
      state.parentApp = action.payload;
    },
    dependencyApps: (state, action: PayloadAction<HatApplication[]>) => {
      state.dependencyApps = action.payload;
    },
    dependencyTools: (state, action: PayloadAction<HatTool[]>) => {
      state.dependencyTools = action.payload;
    },
  },
});

export const { parentApp, dependencyApps, dependencyTools } = slice.actions;

export const setParentApp =
  (app: HatApplication): AppThunk =>
    (dispatch) => {
      dispatch(parentApp(app));
    };

export const setDependencyApps =
  (app: HatApplication[]): AppThunk =>
    (dispatch) => {
      dispatch(dependencyApps(app));
    };

export const setDependencyTools =
  (tool: HatTool[]): AppThunk =>
    (dispatch) => {
      dispatch(dependencyTools(tool));
    };

export const selectParentApp = (state: RootState) => state.hmi.parentApp;
export const selectDependencyApps = (state: RootState) => state.hmi.dependencyApps;
export const selectDependencyTools = (state: RootState) => state.hmi.dependencyTools;

export const selectDependencyToolsPending = (state: RootState) =>
  state.hmi.dependencyTools.filter((tool) => !tool.status.enabled);

export const selectDependencyToolsEnabled = (state: RootState) =>
  state.hmi.dependencyTools.every((tool) => tool.status.enabled);

export const selectDependencyPlugsAreActive = (state: RootState) =>
  state.hmi.dependencyApps.every((app) => app.active === true);

export default slice.reducer;
