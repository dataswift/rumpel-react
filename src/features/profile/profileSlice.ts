import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { Profile, ProfileSharingConfig } from "./profile.interface";
import { BundleStructure } from "@dataswift/hat-js/lib/interfaces/bundle.interface";
import { generatePhataBundle, generateProfileShare } from "./helpers";
import { getUnixTime } from "date-fns";

type ProfileState = {
    profile: Profile;
    updatedAt?: string;
    expirationTime: number;
    profileBundle: BundleStructure;
    profileSharingConfig: ProfileSharingConfig;
    profileFetched: boolean;
    profileBundleFetched: boolean;
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

const defaultProfile: Profile = {
  dateCreated: 0,
  shared: false,
  photo: { avatar: '' },
  personal: {
    title: '', firstName: '', middleName: '', lastName: '',
    preferredName: '', nickName: '', birthDate: '', gender: '', ageGroup: ''
  },
  contact: { primaryEmail: '', alternativeEmail: '', mobile: '', landline: '' },
  emergencyContact: { firstName: '', lastName: '', mobile: '', relationship: '' },
  address: { city: '', county: '', country: '' },
  about: { title: '', body: '' },
  online: { website: '', blog: '', facebook: '', twitter: '', linkedin: '', google: '', youtube: '' }
};

export const initialState: ProfileState = {
  profile: defaultProfile,
  expirationTime: 20,
  profileBundle: DEFAULT_PHATA_BUNDLE,
  profileSharingConfig: DEFAULT_PROFILE_SHARE_CONFIG,
  profileFetched: false,
  profileBundleFetched: false,
};

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.profileFetched = true;
    },
    profileBundle: (state, action: PayloadAction<BundleStructure>) => {
      state.profileBundle = action.payload;
      state.profileBundleFetched = true;
    },
    profileSharingConfig: (state, action: PayloadAction<ProfileSharingConfig>) => {
      state.profileSharingConfig = action.payload;
    },
  },
});

export const { profile, profileBundle, profileSharingConfig } = slice.actions;

export const setProfile = (profileData: Profile): AppThunk => dispatch => {
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
  let current = JSON.parse(JSON.stringify(getState().profile.profile)) as Profile;
  current[key] = value;

  dispatch(profile(current));
  dispatch(saveProfile());
};

export const setProfileSharingConfigKey = (
  id: string,
  key: string,
  overrideToPublic?: boolean
): AppThunk => (dispatch, getState) => {
  const newSharingConfig = JSON.parse(JSON.stringify(getState().profile.profileSharingConfig));

  newSharingConfig[id][key] = overrideToPublic ? true : !getState().profile.profileSharingConfig[id][key];
  dispatch(profileSharingConfig(newSharingConfig));
  dispatch(saveProfileSharingDetails());
};

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileSharingConfig = (state: RootState) => state.profile.profileSharingConfig;
export const selectProfileFetched = (state: RootState) => state.profile.profileFetched;
export const selectProfileBundleFetched = (state: RootState) => state.profile.profileBundleFetched;

export const getProfile = (): AppThunk => async dispatch => {
  try {
    const res = await HatClientService.getInstance().getProfileData();

    if (res?.parsedBody && res.parsedBody.length > 0) {
      dispatch(setProfile(res.parsedBody[0].data));
    }
  } catch (e) {
    // TODO Error Handling
  }
};

export const saveProfile = (): AppThunk => async (dispatch, getState) => {
  try {
    let currentProfile = JSON.parse(JSON.stringify(getState().profile.profile)) as Profile;
    currentProfile.dateCreated = getUnixTime(new Date());

    const res = await HatClientService.getInstance().postProfileData(currentProfile);

    if (res?.parsedBody) {
      dispatch(setProfile(res.parsedBody.data));
    }
  } catch (e) {
    // TODO Error Handling
  }
};

export const saveProfileSharingDetails = (): AppThunk => async (dispatch, getState) => {
  try {
    const newDataBundle = generatePhataBundle(
      getState().profile.profileSharingConfig,
      getState().profile.profileBundle
    );
    
    await HatClientService.getInstance().postDataBundleStructure('phata', newDataBundle);
  } catch (e) {
    // TODO Error Handling
  }
};


export const getProfilePrivacyDataBundle = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await HatClientService.getInstance().getDataBundleStructure('phata');

    if (res?.parsedBody) {
      dispatch(setProfileBundle(res.parsedBody));
      dispatch(setProfileSharingConfig(generateProfileShare(getState().profile.profile, res.parsedBody)));
    }
  } catch (e) {
    // TODO Error Handling
  }
};

export default slice.reducer;
