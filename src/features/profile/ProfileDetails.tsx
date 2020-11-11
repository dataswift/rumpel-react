import React from "react";
import FormAdapter from "../../components/form/FormAdapter";
import ProfileFields from "./ProfileFields";
import { useSelector } from "react-redux";
import { selectProfile, selectProfileSharingConfig } from "./profileSlice";

const ProfileDetails: React.FC = () => {
  const profile = useSelector(selectProfile);
  const profileSharing = useSelector(selectProfileSharingConfig);

  if (!profile) return null;

  const profileElement = ProfileFields.map(field => {
    return (
      <div className={'profile-details-section'} key={field.title}>
        <div className={'profile-details-heading'}>{field.title}</div>
        <div className={'profile-details-content'}>
          <FormAdapter 
            profileField 
            fields={field.fields}
            formId={field.id}
            validations={field.validations}
            values={
              profile?.data[field.id] as Record<string, string>
            }
            profileSharing={profileSharing}
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
