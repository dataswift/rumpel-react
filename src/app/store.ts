import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import applicationsSlice from '../features/applications/applicationsSlice';
import rootReducer from '../redux/reducer/rootReducer';
import authenticationSlice from '../features/authentication/authenticationSlice';
import languageSlice from '../features/language/languageSlice';
import messagesSlice from '../features/messages/messagesSlice';
import hatLoginSlice from '../features/hat-login/hatLoginSlice';
import hatClaimCombinedReducer from '../components/hat-claim/redux/reducers/hatClaimCombinedReducer';

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
    authentication: authenticationSlice,
    language: languageSlice,
    messages: messagesSlice,
    hatLogin: hatLoginSlice,
    hatClaim: hatClaimCombinedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
