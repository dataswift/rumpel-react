import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import applicationsSlice from '../features/applications/applicationsSlice';
import authenticationSlice from '../features/authentication/authenticationSlice';
import languageSlice from '../features/language/languageSlice';
import messagesSlice from '../features/messages/messagesSlice';
import hatLoginSlice from "../features/hat-login/hatLoginSlice";
import hmiSlice from "../features/hmi/hmiSlice";
import hatClaimCombinedReducer from "../features/hat-claim/redux/reducers/hatClaimCombinedReducer";
import toolsSlice from "../features/tools/toolsSlice";
import universalDataViewerSlice from "../features/universal-data-viewer/universalDataViewerSlice";
import publicProfileSlice from "../features/public-profile/publicProfileSlice";
import systemStatusSlice from "../features/system-status/systemStatusSlice";
import profileSlice from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
    authentication: authenticationSlice,
    language: languageSlice,
    messages: messagesSlice,
    hmi: hmiSlice,
    hatLogin: hatLoginSlice,
    tools: toolsSlice,
    universalDataViewer: universalDataViewerSlice,
    publicProfile: publicProfileSlice,
    systemStatus: systemStatusSlice,
    profile: profileSlice,
    hatClaim: hatClaimCombinedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
