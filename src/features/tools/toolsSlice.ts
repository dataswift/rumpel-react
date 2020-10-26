import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { HatTool } from './hat-tool.interface';

type ApplicationsState = {
  tools: HatTool[];
  updatedAt?: string;
  expirationTime: number;
};

export const initialState: ApplicationsState = {
  tools: [],
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    tools: (state, action: PayloadAction<Array<HatTool>>) => {
      state.tools = [...action.payload];
    },
  },
});

export const { tools } = slice.actions;

export const setTools = (tool: Array<HatTool>): AppThunk => (dispatch) => {
  dispatch(tools(tool));
};

export const selectTools = (state: RootState) => state.tools.tools;

export const getTools = (): AppThunk => async (dispatch) => {
  const tools = await HatClientService.getInstance().getTools();

  if (tools?.parsedBody) {
    dispatch(setTools(tools.parsedBody));
  }
};

export const getToolById = (toolId: string): AppThunk => async (dispatch, getState) => {
  const currentTools = getState().tools.tools;
  if (currentTools.find((tool) => tool.id === toolId)) return;

  try {
    const tool = await HatClientService.getInstance().getTool(toolId);
    if (tool?.parsedBody) dispatch(setTools([...currentTools, tool.parsedBody]));
  } catch (e) {
    // TODO error handling
  }
};

export const selectToolById = (id: string) =>
  createSelector(selectTools, (tools) => {
    return tools.find((tool) => tool.id === id);
  });

export const connectTool = (toolId: string): AppThunk => async (dispatch, getState) => {
  try {
    const tool = await HatClientService.getInstance().enableTool(toolId);

    if (tool?.parsedBody) {
      let currentApps = getState().tools.tools;
      currentApps = currentApps.filter((t) => t.id !== toolId);
      currentApps.push(tool.parsedBody);
      dispatch(setTools([...currentApps]));
    }
  } catch (e) {
    // TODO error handling
  }
};

export default slice.reducer;
