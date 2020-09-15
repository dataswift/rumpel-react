import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { BundleValues } from "@dataswift/hat-js/lib/interfaces/bundle.interface";
import { getPublicProfile } from "../../api/hatAPI";
import { Profile } from "./profile.interface";

type PublicProfileState = {
    publicProfile: BundleValues | null;
    profile: Profile | null;
    updatedAt?: string;
    expirationTime: number;
};

export const initialState: PublicProfileState = {
  publicProfile: null,
  profile: null,
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'publicProfile',
  initialState,
  reducers: {
    publicProfile: (state, action: PayloadAction<BundleValues>) => {
      state.publicProfile = action.payload;
      if (action.payload.profile) {
        state.profile = action.payload.profile[0].data;
      }
    },
  },
});

export const { publicProfile } = slice.actions;

export const setPublicProfile = (profile: BundleValues): AppThunk => dispatch => {
  dispatch(publicProfile(profile));
};

export const selectPublicProfileResponse = (state: RootState) => state.publicProfile.publicProfile;
export const selectPublicProfile = (state: RootState) => state.publicProfile.profile;

export const getPublicProfileReq = (): AppThunk => async dispatch => {
  const res = await getPublicProfile();

  if (res?.parsedBody) {
    dispatch(setPublicProfile(res.parsedBody));
  }
};

export default slice.reducer;
