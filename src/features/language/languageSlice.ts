import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

type LanguageState = {
  language: string;
};

export const initialState: LanguageState = {
  language: 'en',
};

export const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    language: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { language } = slice.actions;

export const setLanguage = (lang: string): AppThunk => (dispatch) => {
  dispatch(language(lang));
};

export const selectLanguage = (state: RootState) => state.language.language;

export default slice.reducer;
