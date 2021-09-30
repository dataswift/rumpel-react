import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import FormatMessage from '../../features/messages/FormatMessage';

const ActionMenu: React.FC<{ showOptions: boolean }> = ({ showOptions, children }) => {
  const history = useHistory();
  const menuRef = useRef<HTMLObjectElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (showMenu === true && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, [showMenu, menuRef]);

  if (!showOptions) {
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
        aria-label="Action Menu"
        className="actions-menu"
        style={showMenu ? { display: 'flex' } : {}}
      >
        <div className="actions-menu-content">
          {children}

          <button onClick={() => setShowMenu(false)} className="actions-menu-item">
            <FormatMessage id="ds.hat.action.menu.cancel" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ActionMenu;
