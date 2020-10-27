import React from "react";
import ProfileHeader from "./ProfileHeader";
import './Profile.scss';

const Profile: React.FC = () => {
  return (
    <div className={'profile'}>
      <ProfileHeader />
    </div>
  );
};
export default Profile;
