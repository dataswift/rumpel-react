import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../authentication/authenticationSlice';
import FormatMessage from '../messages/FormatMessage';

import './Settings.scss';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logoutUser());

  return (
    <div className="settings-user-actions">
      <button className="btn btn-accent" onClick={onLogout}>
        <FormatMessage id="ds.auth.logoutBtn" />
      </button>
    </div>
  );
};

export default Logout;
