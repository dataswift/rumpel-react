import React from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';
import ProfileDetails from "./ProfileDetails";

const Profile: React.FC = () => {
  return (
    <div className={'profile'}>
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};
export default Profile;
