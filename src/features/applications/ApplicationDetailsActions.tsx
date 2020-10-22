import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { disableHatApplication } from './applicationsSlice';
import './ApplicationDetailsActions.scss';

const AppDetailsToolbarActions: React.FC<{ setup: boolean; appId: string }> = ({ setup, appId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLObjectElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const disableApp = () => dispatch(disableHatApplication(appId));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (showMenu === true && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, [showMenu, menuRef]);

  if (!setup) {
    return (
      <i onClick={() => history.goBack()} className="material-icons details-icon">
        clear
      </i>
    );
  }

  return (
    <>
      <i className="material-icons details-icon" onClick={() => setShowMenu(!showMenu)}>
        more_horiz
      </i>

      <div
        ref={menuRef}
        aria-label="Application Action Menu"
        className="actions-menu"
        style={showMenu ? { display: 'flex' } : {}}
      >
        <div className="actions-menu-content">
          <Link to={`${appId}/permissions`} className="actions-menu-item">
            <i className="material-icons">phonelink_lock</i> App permissions
          </Link>

          <button onClick={disableApp} className="actions-menu-item">
            <i className="material-icons">link_off</i> Disconnect app
          </button>

          <button onClick={() => setShowMenu(false)} className="actions-menu-item">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AppDetailsToolbarActions;
