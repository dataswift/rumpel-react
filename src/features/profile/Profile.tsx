import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePrivacyDataBundle, selectProfileBundleFetched } from "./profileSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const profileBundleFetched = useSelector(selectProfileBundleFetched);

  useEffect(() => {
    if (!profileBundleFetched) {
      dispatch(getProfilePrivacyDataBundle());
    }
  }, [dispatch, profileBundleFetched]);

  return (
    <div className={'profile'}>
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
