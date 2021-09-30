import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { disableHatApplication } from './applicationsSlice';
import ActionMenu from '../../components/Menus/ActionMenu';
import FormatMessage from '../messages/FormatMessage';

const AppDetailsToolbarActions: React.FC<{ setup: boolean; appId: string }> = ({
  setup,
  appId,
}) => {
  const dispatch = useDispatch();
  const disableApp = () => dispatch(disableHatApplication(appId));

  return (
    <ActionMenu showOptions={setup}>
      <Link to={`${appId}/permissions`} className="actions-menu-item">
        <i className="material-icons">phonelink_lock</i>{' '}
        <FormatMessage id="ds.hat.application.actions.permissions" />
      </Link>

      <button onClick={disableApp} className="actions-menu-item">
        <i className="material-icons">link_off</i>{' '}
        <FormatMessage id="ds.hat.application.actions.disconnect" />
      </button>
    </ActionMenu>
  );
};

export default AppDetailsToolbarActions;
