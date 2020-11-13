import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePrivacyDataBundle, selectProfile } from "./profileSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (profile) {
      dispatch(getProfilePrivacyDataBundle());
    }
  }, [dispatch, profile]);

  return (
    <div className={'profile'}>
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
