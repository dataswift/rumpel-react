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

export const setMessages = (msgs: Messages): AppThunk => dispatch => {
  dispatch(messages(msgs));
};

export const selectMessages = (state: RootState) => state.messages;

export const fetchMessages = (id: string): AppThunk => async dispatch => {
  if (id === 'en') {
    import(
      /* webpackChunkName: "en_lang" */
      '../../translations/en.json'
    ).then(({ default: jsonMenu }) => {
      return dispatch(setMessages(jsonMenu));
    });
  } else if (id === 'pt') {
    import(
      /* webpackChunkName: "pt_lang" */
      '../../translations/pt.json'
    ).then(({ default: jsonMenu }) => {
      // do whatever you like with your "jsonMenu" variable
      return dispatch(setMessages(jsonMenu));
    });
  }
};

export default slice.reducer;
