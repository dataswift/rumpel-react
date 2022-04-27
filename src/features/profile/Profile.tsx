import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Profile.scss';

import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import { getProfilePrivacyDataBundle, selectProfileBundleFetched } from './profileSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const profileBundleFetched = useSelector(selectProfileBundleFetched);

  useEffect(() => {
    if (!profileBundleFetched) {
      dispatch(getProfilePrivacyDataBundle());
    }
  }, [dispatch, profileBundleFetched]);

  return (
    <div className="profile">
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
