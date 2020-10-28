import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DetailsHeader from '../../components/headers/DetailsHeader/DetailsHeader';
import { selectUserHatDomain, selectUserHatName } from '../authentication/authenticationSlice';
import {
  selectSystemStatusDatabaseStorage,
  selectSystemStatusUsedPercentage,
} from '../system-status/systemStatusSlice';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { SystemStatusInterface } from '../system-status/system-status.interface';
import defaultIcon from '../../assets/icons/user-account-icon-blue.svg';
import './Settings.scss';
import { getProfile, selectProfile } from '../profile/profileSlice';
import SettingsList from './SettingsList';

const getStoragePercentage = (databaseUsedPercentage?: SystemStatusInterface): number => {
  if (!databaseUsedPercentage?.kind.metric) return 0;

  const parsed = parseInt(databaseUsedPercentage.kind.metric);

  if (isNaN(parsed)) return 0;

  if (parsed >= 100) return 100;

  return parsed;
};

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const profileRecord = useSelector(selectProfile);
  const userHatName = useSelector(selectUserHatName);
  const userHatDomain = useSelector(selectUserHatDomain);
  const databaseStorage = useSelector(selectSystemStatusDatabaseStorage);
  const databaseUsed = useSelector(selectSystemStatusUsedPercentage);

  useEffect(() => {
    if (!profileRecord) dispatch(getProfile());
  }, [dispatch, profileRecord]);

  if (!profileRecord?.data) return null;

  const profile = profileRecord.data;
  const storagePercentage = getStoragePercentage(databaseUsed);

  return (
    <div>
      <DetailsHeader
        logoSrc={profile?.photo?.avatar || defaultIcon}
        logoAltText="Profile Avatar"
        backgroundColor="#f6f6f6"
      >
        <h3 className="settings-header-title">{userHatName}</h3>
        <div className="settings-header-headline">{userHatDomain}</div>

        <ProgressBar progress={storagePercentage} />

        {databaseUsed && databaseStorage && (
          <div className="settings-header-headline">
            {`${storagePercentage}% of ${databaseStorage.kind.metric}${databaseStorage.kind.units} storage used`}
          </div>
        )}
      </DetailsHeader>

      <SettingsList />
    </div>
  );
};

export default Settings;
