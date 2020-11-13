import React from "react";
import FormAdapter from "../../components/form/FormAdapter";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, selectProfileFetched, selectProfileSharingConfig, setProfileKeyValue } from "./profileSlice";
import ProfileSections from "./ProfileSections";

const ProfileDetails: React.FC = () => {
  const profile = useSelector(selectProfile);
  const profileFetched = useSelector(selectProfileFetched);
  const profileSharing = useSelector(selectProfileSharingConfig);
  const dispatch = useDispatch();

  const onFormDataChange = (key: string, data: Record<string, string>) => {
    dispatch(setProfileKeyValue(key, data));
  };

  if (!profileFetched) return null;

  const profileElement = ProfileSections.map(section => {
    return (
      <div className={'profile-details-section'} key={section.title}>
        <div className={'profile-details-heading'}>{section.title}</div>
        <div className={'profile-details-content'}>
          {section.groupFields.map(fields => {
            return <FormAdapter
              profileField
              key={fields.id}
              fields={fields.fields}
              formId={fields.id}
              validations={fields.validations}
              values={
                  profile?.data[fields.id] as Record<string, string>
              }
              profileSharing={profileSharing}
              onFormDataChange={onFormDataChange}
            />;
          })
          }
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
