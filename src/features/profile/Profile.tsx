import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePrivacyDataBundle, selectProfileFetched } from "./profileSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const profileFetched = useSelector(selectProfileFetched);

  useEffect(() => {
    if (!profileFetched) {
      dispatch(getProfilePrivacyDataBundle());
    }
  }, [dispatch, profileFetched]);

  return (
    <div className={'profile'}>
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
