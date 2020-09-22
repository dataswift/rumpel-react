import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { DataSourcesInterface } from "./DataSources.interface";

type UniversalDataViewerState = {
    dataSources?: DataSourcesInterface;
    updatedAt?: string;
    expirationTime: number;
};

export const initialState: UniversalDataViewerState = {
  dataSources: undefined,
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'universalDataViewer',
  initialState,
  reducers: {
    dataSources: (state, action: PayloadAction<DataSourcesInterface>) => {
      state.dataSources = action.payload;
    },
  },
});

export const { dataSources } = slice.actions;

export const setDataSources = (data: DataSourcesInterface): AppThunk => dispatch => {
  dispatch(dataSources(data));
};

export const selectDataSources = (state: RootState) => state.universalDataViewer.dataSources;

export const getDataSources = (): AppThunk => async dispatch => {
  const apps = await HatClientService.getInstance().getDataSources();

  if (apps?.parsedBody) {
    dispatch(setDataSources(apps.parsedBody));
  }
};

export default slice.reducer;
