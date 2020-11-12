import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { Profile, ProfileSharingConfig } from "./profile.interface";
import { HatRecord } from "@dataswift/hat-js/lib/interfaces/hat-record.interface";
import { BundleStructure } from "@dataswift/hat-js/lib/interfaces/bundle.interface";
import { generateProfileShare } from "./helpers";

type ProfileState = {
    profile: HatRecord<Profile>[];
    updatedAt?: string;
    expirationTime: number;
    profileBundle: BundleStructure;
    profileSharingConfig: ProfileSharingConfig;
};

const DEFAULT_PROFILE_SHARE_CONFIG: ProfileSharingConfig = {
  photo: { avatar: false },
  personal: {
    title: false, firstName: false, middleName: false, lastName: false,
    preferredName: false, nickName: false, birthDate: false, gender: false, ageGroup: false
  },
  contact: { primaryEmail: false, alternativeEmail: false, mobile: false, landline: false },
  emergencyContact: { firstName: false, lastName: false, mobile: false, relationship: false },
  address: { city: false, county: false, country: false },
  about: { title: false, body: false },
  online: {
    website: false, blog: false, facebook: false, twitter: false, linkedin: false, google: false, youtube: false
  }
};

export const DEFAULT_PHATA_BUNDLE: BundleStructure = {
  name: 'phata',
  bundle: {
    notables: {
      endpoints: [{
        filters: [{
          field: 'shared',
          operator: {
            value: true,
            operator: 'contains'
          }
        }, {
          field: 'shared_on',
          operator: {
            value: 'phata',
            operator: 'contains'
          }
        }],
        mapping: {
          kind: 'kind',
          shared: 'shared',
          currently_shared: 'currently_shared',
          message: 'message',
          author: 'authorv1',
          location: 'locationv1',
          photo: 'photov1',
          shared_on: 'shared_on',
          created_time: 'created_time',
          public_until: 'public_until',
          updated_time: 'updated_time'
        },
        endpoint: 'rumpel/notablesv1'
      }],
      orderBy: 'updated_time',
      ordering: 'descending'
    }
  }
};

export const initialState: ProfileState = {
  profile: [],
  expirationTime: 20,
  profileBundle: DEFAULT_PHATA_BUNDLE,
  profileSharingConfig: DEFAULT_PROFILE_SHARE_CONFIG
};

export const slice = createSlice({
  name: 'systemStatus',
  initialState,
  reducers: {
    profile: (state, action: PayloadAction<HatRecord<Profile>[]>) => {
      state.profile = action.payload;
    },
    profileBundle: (state, action: PayloadAction<BundleStructure>) => {
      state.profileBundle = action.payload;
    },
    profileSharingConfig: (state, action: PayloadAction<ProfileSharingConfig>) => {
      state.profileSharingConfig = action.payload;
    },
  },
});

export const { profile, profileBundle, profileSharingConfig } = slice.actions;

export const setProfile = (profileData: HatRecord<Profile>[]): AppThunk => dispatch => {
  dispatch(profile(profileData));
};

export const setProfileBundle = (bundle: BundleStructure): AppThunk => dispatch => {
  dispatch(profileBundle(bundle));
};

export const setProfileSharingConfig = (config: ProfileSharingConfig): AppThunk => dispatch => {
  dispatch(profileSharingConfig(config));
};

export const setProfileKeyValue = (
  key: string,
  value: number | boolean | Record<string, string>
): AppThunk => (dispatch, getState) => {
  let current = JSON.parse(JSON.stringify(getState().profile.profile[0])) as HatRecord<Profile>;
  current.data[key] = value;

  dispatch(profile([current]));
};

export const setProfileSharingConfigKey = (id: string, key: string): AppThunk => (dispatch, getState) => {
  const newSharingConfig = JSON.parse(JSON.stringify(getState().profile.profileSharingConfig));
  newSharingConfig[id][key] = !getState().profile.profileSharingConfig[id][key];
  dispatch(profileSharingConfig(newSharingConfig));
};

export const selectProfile = (state: RootState) => state.profile.profile[0];
export const selectProfileSharingConfig = (state: RootState) => state.profile.profileSharingConfig;

export const getProfile = (): AppThunk => async dispatch => {
  try {
    const res = await HatClientService.getInstance().getProfileData();

    if (res?.parsedBody && res.parsedBody.length > 0) {
      dispatch(setProfile(res.parsedBody));
    }
  } catch (e) {
    // TODO Error Handling
    console.log(e);
  }
};

export const getProfilePrivacyDataBundle = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await HatClientService.getInstance().getDataBundleStructure('phata');

    if (res?.parsedBody) {
      dispatch(setProfileBundle(res.parsedBody));
      dispatch(setProfileSharingConfig(generateProfileShare(getState().profile.profile[0].data, res.parsedBody)));
    }
  } catch (e) {
    // TODO Error Handling
    console.log(e);
  }
};

export default slice.reducer;
