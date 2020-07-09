import React, { useEffect, useState } from 'react';
import './NavigationHeader.scss';
import { ProfileDropDown } from "../../../features/profile/ProfileDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getSystemStatus } from "../../../features/system-status/systemStatusSlice";
import { selectIsAuthenticated } from "../../../features/authentication/authenticationSlice";
import { getProfile } from "../../../features/profile/profileSlice";
import { Modal } from "../../Modal/Modal";

type Props = {
    toggleSideMenu: () => void;
}

export const NavigationHeader: React.FC<Props> = ({ toggleSideMenu }) => {
  const [openHelpDialog, setOpenHelpDialog] = useState(false);
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

        <button className={'header-help'} onClick={() => setOpenHelpDialog(true)}>
          <i className={'material-icons'}>help_outline</i>Help
        </button>

        <ProfileDropDown />
      </div>
      <Modal
        open={openHelpDialog}
        titleMessageId={'hatapp.help.dialog.title'}
        onClose={() => setOpenHelpDialog(!openHelpDialog)}
      >
        <div>HATs are distributed systems and being private
          also means no one will know if you have a problem.<br /><br />
          If you have an issue with your HAT or this dashboard, please report
          it <a href={`mailto:contact@dataswift.io?subject=Support%20for%20${ window.location.hostname }`}>
            here
        </a>
        </div>
      </Modal>
    </header>
  );
};
