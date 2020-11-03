import React from "react";
import FormAdapter from "../../components/form/FormAdapter";
import ProfileFields from "./ProfileFields";
import { useSelector } from "react-redux";
import { selectProfile } from "./profileSlice";

const ProfileDetails: React.FC = () => {
  const profile = useSelector(selectProfile);

  const profileElement = ProfileFields.map(field => {
    return (
      <div className={'profile-details-section'} key={field.title}>
        <div className={'profile-details-heading'}>{field.title}</div>
        <div className={'profile-details-content'}>
          <FormAdapter 
            profileField 
            fields={field.fields} 
            values={
                  // @ts-ignore
                  profile?.data[field.id]
            }
          />
        </div>
      </div>
    );
  });
  
  return (
    <>
      {profileElement}
    </>
  );
};

export default ProfileDetails;
