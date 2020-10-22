import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export default slice.reducer;
