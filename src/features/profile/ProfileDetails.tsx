import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormAdapter from '../../components/form/FormAdapter';
import { selectProfile, selectProfileSharingConfig, setProfileKeyValue } from './profileSlice';
import ProfileSections from './ProfileSections';

const ProfileDetails: React.FC = () => {
  const profile = useSelector(selectProfile);
  const profileSharing = useSelector(selectProfileSharingConfig);
  const dispatch = useDispatch();

  const onFormDataChange = (key: string, data: Record<string, string>) => {
    dispatch(setProfileKeyValue(key, data));
  };

  const profileElement = ProfileSections.map((section) => (
    <div className="profile-details-section" key={section.title}>
      <div className="profile-details-heading">{section.title}</div>
      <div className="profile-details-content">
        {section.groupFields.map((fields) => (
          <FormAdapter
            profileField
            key={fields.id}
            fields={fields.fields}
            formId={fields.id}
            validations={fields.validations}
            values={profile?.[fields.id] as Record<string, string>}
            profileSharing={profileSharing}
            onFormDataChange={onFormDataChange}
          />
        ))}
      </div>
    </div>
  ));

  return <>{profileElement}</>;
};

export default ProfileDetails;
