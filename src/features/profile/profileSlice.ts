import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { Profile } from "./profile.interface";
import { HatRecord } from "@dataswift/hat-js/lib/interfaces/hat-record.interface";

type ProfileState = {
    profile: HatRecord<Profile>[];
    updatedAt?: string;
    expirationTime: number;
};

export const initialState: ProfileState = {
  profile: [],
  expirationTime: 20,
};

export const slice = createSlice({
  name: 'systemStatus',
  initialState,
  reducers: {
    profile: (state, action: PayloadAction<HatRecord<Profile>[]>) => {
      state.profile.push(...action.payload);
    },
  },
});

export const { profile } = slice.actions;

export const setProfile = (profileData: HatRecord<Profile>[]): AppThunk => dispatch => {
  dispatch(profile(profileData));
};

export const selectProfile = (state: RootState) => state.profile.profile[0];

export const getProfile = (): AppThunk => async dispatch => {
  try {
    const res = await HatClientService.getInstance().getProfileData();

    console.log(res.parsedBody);
    if (res?.parsedBody && res.parsedBody.length > 0) {
      dispatch(setProfile(res.parsedBody));
    }
  } catch (e) {
    console.log(e);
  }
};

export default slice.reducer;
