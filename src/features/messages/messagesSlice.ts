import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export interface Messages {
  [index: string]: string;
}

export const initialState: Messages = {};

export const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messages: (state, action: PayloadAction<Messages>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { messages } = slice.actions;

export const setMessages =
  (msgs: Messages): AppThunk =>
  (dispatch) => {
    dispatch(messages(msgs));
  };

export const selectMessages = (state: RootState) => state.messages;

export const fetchMessages =
  (id: string): AppThunk =>
  async (dispatch) => {
    if (id === 'pt') {
      const { default: messages } = await import(
        /* webpackChunkName: "pt_lang" */ '../../translations/pt.json'
      );
      return dispatch(setMessages(messages));
    }
    const { default: messages } = await import(
      /* webpackChunkName: "en_lang" */ '../../translations/en.json'
    );
    return dispatch(setMessages(messages));
  };

export default slice.reducer;
