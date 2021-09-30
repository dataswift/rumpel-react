import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HatRecord } from '@dataswift/hat-js/lib/interfaces/hat-record.interface';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';
import { DataSourcesInterface } from './DataSources.interface';

type UniversalDataViewerState = {
  dataSources?: DataSourcesInterface;
  endpointDataPreview: Record<string, Array<HatRecord<any>>>;
  flattenDataPreview: Record<string, string>;
  updatedAt?: string;
  expirationTime: number;
};

export const initialState: UniversalDataViewerState = {
  dataSources: undefined,
  endpointDataPreview: {},
  flattenDataPreview: {},
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'universalDataViewer',
  initialState,
  reducers: {
    dataSources: (state, action: PayloadAction<DataSourcesInterface>) => {
      state.dataSources = action.payload;
    },
    endpointData: (state, action: PayloadAction<Array<HatRecord<any>>>) => {
      state.endpointDataPreview[action.payload[0].endpoint] = action.payload;
    },
  },
});

export const { dataSources, endpointData } = slice.actions;

export const setDataSources =
  (data: DataSourcesInterface): AppThunk =>
  (dispatch) => {
    dispatch(dataSources(data));
  };

export const setEndpointData =
  (data: Array<HatRecord<any>>): AppThunk =>
  (dispatch) => {
    dispatch(endpointData(data));
  };

export const selectDataSources = (state: RootState) => state.universalDataViewer.dataSources;
export const selectEndpointDataPreview = (state: RootState) =>
  state.universalDataViewer.endpointDataPreview;

export const getDataSources = (): AppThunk => async (dispatch) => {
  try {
    const apps = await HatClientService.getInstance().getDataSources();

    if (apps?.parsedBody) {
      dispatch(setDataSources(apps.parsedBody));
    }
  } catch (e) {
    // TODO: Error handling
  }
};

export const getDataRecords =
  (namespace: string, endpoint: string, take: number, skip: number): AppThunk =>
  async (dispatch) => {
    try {
      const options = {
        ordering: 'descending',
        orderBy: 'dataCreated',
        take: `${take}`,
        skip: `${skip}`,
      };

      const res = await HatClientService.getInstance().getData(namespace, endpoint, options);

      if (res?.parsedBody && res.parsedBody.length > 0) {
        dispatch(setEndpointData(res.parsedBody));
      }
    } catch (e) {
      // TODO: Error handling
    }
  };

export default slice.reducer;
