import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProfileDropDown.scss';

import userLogo from '../../assets/icons/user-account-icon.svg';
import userLogoBlue from '../../assets/icons/user-account-icon-blue.svg';
import {
  selectSystemStatusDatabaseStorage,
  selectSystemStatusPreviousLogin,
  selectSystemStatusRecords,
  selectSystemStatusUsedPercentage,
} from '../system-status/systemStatusSlice';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import {
  logoutUser,
  selectUserHatDomain,
  selectUserHatName,
} from '../authentication/authenticationSlice';
import { selectProfile } from './profileSlice';

export const ProfileDropDown: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const systemStatus = useSelector(selectSystemStatusRecords);
  const databaseStorage = useSelector(selectSystemStatusDatabaseStorage);
  const databaseUsedPercentage = useSelector(selectSystemStatusUsedPercentage);
  const previousLogin = useSelector(selectSystemStatusPreviousLogin);
  const userHatName = useSelector(selectUserHatName);
  const userHatDomain = useSelector(selectUserHatDomain);
  const profile = useSelector(selectProfile);

  const getStoragePercentage = () => {
    if (databaseUsedPercentage?.kind.metric) {
      const parsed = parseInt(databaseUsedPercentage.kind.metric, 10);

      if (Number.isNaN(parsed)) return 0;

      if (parsed >= 100) return 100;

      return parsed;
    }
    return 0;
  };

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="profile-dropdown">
        <button
          className="profile-dropdown-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="user-photo">
            <img src={profile?.photo?.avatar || userLogo} alt="Profile" />
          </span>

          <span className="welcome">
            Welcome {userHatName}
            <br />
            {previousLogin && <span>Last login: {previousLogin.kind.metric}</span>}
          </span>

          <i className="material-icons profile-dropdown-arrow">
            {menuOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </i>
        </button>
      </div>
      {menuOpen && (
        <div className="profile-dropdown-overlay">
          <div className="accountDetails user-photo">
            <img src={profile?.photo?.avatar || userLogoBlue} alt="Profile" />
            <h6 className="welcome">
              {userHatName}
              <br />
              <span>{userHatDomain}</span>
            </h6>
          </div>
          {systemStatus && systemStatus.length > 0 && databaseUsedPercentage && databaseStorage && (
            <div className="accountUsage">
              <ProgressBar progress={getStoragePercentage()} />
              <div className="app-details-header-headline">
                {`${getStoragePercentage()}% of ${
                  databaseStorage.kind.metric + databaseStorage.kind.units
                } storage used`}
              </div>
            </div>
          )}
          <div className="dropdown-divider" />
          <Link className="dropdown-item" to="/public/profile">
            Public profile
          </Link>
          <a className="dropdown-item" href={`${window.location.origin}/#/user/password/change`}>
            Change password
          </a>
          <div className="dropdown-divider" />

          <button
            className="dropdown-item"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => logout()}
          >
            Logout <i className="material-icons">exit_to_app</i>
          </button>
        </div>
      )}
    </>
  );
};
