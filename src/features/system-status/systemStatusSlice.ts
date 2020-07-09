import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { SystemStatusInterface } from "./system-status.interface";

type SystemStatusState = {
    systemStatus: SystemStatusInterface[];
    updatedAt?: string;
    expirationTime: number;
};

export const initialState: SystemStatusState = {
  systemStatus: [],
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'systemStatus',
  initialState,
  reducers: {
    systemStatus: (state, action: PayloadAction<Array<SystemStatusInterface>>) => {
      state.systemStatus.push(...action.payload);
    },
  },
});

export const { systemStatus } = slice.actions;

export const setSystemStatus = (systemStatusRecords: Array<SystemStatusInterface>): AppThunk => dispatch => {
  dispatch(systemStatus(systemStatusRecords));
};

export const selectSystemStatusRecords = (state: RootState) => state.systemStatus.systemStatus;
export const selectSystemStatusDatabaseStorage = (state: RootState) =>
  state.systemStatus.systemStatus.find(record => record.title === 'Database Storage');
export const selectSystemStatusUsedPercentage = (state: RootState) =>
  state.systemStatus.systemStatus.find(record => record.title === 'Database Storage Used Share');
export const selectSystemStatusPreviousLogin = (state: RootState) =>
  state.systemStatus.systemStatus.find(record => record.title === 'Previous Login');



export const getSystemStatus = (): AppThunk => async dispatch => {
  try {
    const res = await HatClientService.getInstance().getSystemStatusRecords();

    if (res?.parsedBody) {
      dispatch(setSystemStatus(res.parsedBody));
    }
  } catch (e) {
    // TODO Error Handling
    console.log(e);
  }
};

export default slice.reducer;
