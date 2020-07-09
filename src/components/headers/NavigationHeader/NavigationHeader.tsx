import React, { useEffect } from 'react';
import './NavigationHeader.scss';
import { ProfileDropDown } from "../../../features/profile/ProfileDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getSystemStatus } from "../../../features/system-status/systemStatusSlice";
import { selectIsAuthenticated } from "../../../features/authentication/authenticationSlice";
import { getProfile } from "../../../features/profile/profileSlice";

type Props = {
    toggleSideMenu: () => void;
}

export const NavigationHeader: React.FC<Props> = ({ toggleSideMenu }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSystemStatus());
      dispatch(getProfile());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <header className={'app-header'}>
      <div className={'app-header-content flex-row-wrapper'}>
        <button className={'side-menu-toggle'} onClick={ () => toggleSideMenu()}>
          <i className={'material-icons'}>menu</i>
        </button>

        <span className={'flex-spacer-small'} />

        <div className={'text-medium'}>Help</div>
        <ProfileDropDown />
      </div>
    </header>
  );
};
