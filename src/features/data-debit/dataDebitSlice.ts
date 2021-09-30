import { DataDebit } from '@dataswift/hat-js/lib/interfaces/data-debit.interface';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from '../../services/HatClientService';

type ApplicationsState = {
  dataDebits: DataDebit[];
};

export const initialState: ApplicationsState = {
  dataDebits: [],
};

export const slice = createSlice({
  name: 'dataDebits',
  initialState,
  reducers: {
    setDataDebits: (state, action: PayloadAction<Array<DataDebit>>) => {
      state.dataDebits = action.payload;
    },
  },
});

export const { setDataDebits } = slice.actions;

export const selectDataDebits = (state: RootState): DataDebit[] => state.dataDebits.dataDebits;

export const selectDataDebitById = (id: string) =>
  createSelector(selectDataDebits, (dataDebits) =>
    dataDebits.find((dataDebit) => dataDebit.dataDebitKey === id),
  );

export const getDataDebits = (): AppThunk => async (dispatch) => {
  const dataDebits = await HatClientService.getInstance().getDataDebits();

  if (dataDebits?.parsedBody) {
    dispatch(setDataDebits(dataDebits.parsedBody));
  }
};

export const disableDataDebit =
  (dataDebitId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const app = await HatClientService.getInstance().disableDataDebit(dataDebitId, false);
      if (app?.parsedBody) {
        let currentDataDebits = getState().dataDebits.dataDebits;
        currentDataDebits = currentDataDebits.filter((a) => a.dataDebitKey !== dataDebitId);
        currentDataDebits.push(app.parsedBody);
        dispatch(setDataDebits([...currentDataDebits]));
      }
    } catch (e) {
      // TODO error handling
    }
  };

export default slice.reducer;
