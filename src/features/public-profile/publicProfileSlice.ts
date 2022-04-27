import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BundleValues } from '@dataswift/hat-js/lib/interfaces/bundle.interface';
import { AppThunk, RootState } from '../../app/store';
import { Profile } from './profile.interface';
import { HatClientService } from '../../services/HatClientService';

type PublicProfileState = {
  publicProfile: BundleValues | null;
  profile: Profile | null;
  updatedAt?: string;
  pending: boolean;
  expirationTime: number;
};

export const initialState: PublicProfileState = {
  publicProfile: null,
  profile: null,
  pending: true,
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
      state.pending = false;
    },
    getPublicProfileError: (state) => {
      state.pending = false;
    },
  },
});

export const { publicProfile, getPublicProfileError } = slice.actions;

export const setPublicProfile =
  (profile: BundleValues): AppThunk =>
  (dispatch) => {
    dispatch(publicProfile(profile));
  };

export const selectPublicProfileResponse = (state: RootState) => state.publicProfile.publicProfile;
export const selectPublicProfile = (state: RootState) => state.publicProfile.profile;
export const selectPublicProfilePending = (state: RootState) => state.publicProfile.pending;

export const getPublicProfileReq = (): AppThunk => async (dispatch) => {
  try {
    const res = await HatClientService.getInstance().getPublicProfile();

    if (res?.parsedBody) {
      dispatch(setPublicProfile(res.parsedBody));
    }
  } catch (e) {
    dispatch(getPublicProfileError());
  }
};

export default slice.reducer;
