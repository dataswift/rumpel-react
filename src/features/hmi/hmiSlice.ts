import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from '../../services/HatClientService';
import { HatTool } from "../tools/hat-tool.interface";

type ApplicationsState = {
    parentApp: HatApplication | null;
    dependencyApps: HatApplication[];
    dependencyTools: HatTool[];
};

export const initialState: ApplicationsState = {
  parentApp: null,
  dependencyApps: [],
  dependencyTools: []
};

export const slice = createSlice({
  name: 'hmi',
  initialState,
  reducers: {
    parentApp: (state, action: PayloadAction<HatApplication>) => {
      state.parentApp = action.payload;
    },
    dependencyApps: (state, action: PayloadAction<HatApplication[]>) => {
      state.dependencyApps.push(...action.payload);
    },
    dependencyTools: (state, action: PayloadAction<HatTool[]>) => {
      state.dependencyTools = action.payload;
    },
  },
});

export const { parentApp, dependencyApps, dependencyTools } = slice.actions;

export const setParentApp = (app: HatApplication): AppThunk => dispatch => {
  dispatch(parentApp(app));
};

export const setDependencyApps = (app: HatApplication[]): AppThunk => dispatch => {
  dispatch(dependencyApps(app));
};

export const setDependencyTools = (tool: HatTool[]): AppThunk => dispatch => {
  dispatch(dependencyTools(tool));
};

export const selectParentApp = (state: RootState) => state.hmi.parentApp;
export const selectDependencyApps = (state: RootState) => state.hmi.dependencyApps;
export const selectDependencyTools = (state: RootState) => state.hmi.dependencyTools;

export const selectDependencyToolsPending = (state: RootState) => 
  state.hmi.dependencyTools.filter(tool => !tool.status.enabled);

export const selectDependencyToolsEnabled = (state: RootState) =>
  state.hmi.dependencyTools.every(tool => tool.status.enabled);

export const selectDependencyPlugsEnabled = (state: RootState) =>
  state.hmi.dependencyApps.every(app => app.enabled === true);

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

export const enableTool = (toolId: string): AppThunk => async dispatch => {
  try {
    const tool = await HatClientService.getInstance().enableTool(toolId);

    if (tool?.parsedBody) {
      return dispatch(setDependencyTools([tool.parsedBody]));
    }
  } catch (e) {
    // todo error handling
    console.log(e);
  }
};

export default slice.reducer;
