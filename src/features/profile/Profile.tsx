import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePrivacyDataBundle, selectProfile, selectProfileFetched } from "./profileSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profileFetched = useSelector(selectProfileFetched);

  useEffect(() => {
    if (profile && !profileFetched) {
      dispatch(getProfilePrivacyDataBundle());
    }
  }, [dispatch, profileFetched, profile]);

  return (
    <div className={'profile'}>
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
