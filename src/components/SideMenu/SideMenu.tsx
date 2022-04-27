import React, { ReactNode } from 'react';
import './SideMenu.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { config } from '../../app.config';
import hatLogo from '../../assets/icons/hat-logo.png';
import {
  selectUserHatDomain,
  selectUserHatName,
} from '../../features/authentication/authenticationSlice';

type LinkProps = {
  link: string;
  external: boolean;
  children: ReactNode;
};

type Props = {
  hideSideMenu: boolean;
  onSideMenuClick: () => void;
};

export const SideMenu: React.FC<Props> = ({ hideSideMenu, onSideMenuClick }) => {
  const hatName = useSelector(selectUserHatName);
  const hatDomain = useSelector(selectUserHatDomain);

  const SideMenuLink: React.FC<LinkProps> = ({ link, external, children }) => {
    if (external) {
      const linkTo = `https://${hatName + hatDomain}#${link}`;

      return (
        <a href={linkTo} className="side-menu-item-wrapper">
          {children}
        </a>
      );
    }
    return (
      <Link to={link} className="side-menu-item-wrapper" onClick={onSideMenuClick}>
        {children}
      </Link>
    );
  };

  const SideMenuOptions = config.mainMenu.map((item, index) => {
    const isSelected = () => {
      if (!item.external && window.location.pathname.startsWith(item.link)) {
        return 'side-menu-item-selected';
      }

      return '';
    };

    return (
      <div className={`side-menu-item ${isSelected()}`} key={item.display + index}>
        <div className="tooltip">
          <span className="tooltiptext" id="myTooltip">
            {item.description}
          </span>
          <SideMenuLink link={item.link} external={item.external}>
            <div className="side-menu-item-icon">
              <i className="material-icons">{item.icon}</i>
            </div>
            <div className="side-menu-item-name">{item.display}</div>
          </SideMenuLink>
        </div>
      </div>
    );
  });

  return (
    <div className="side-menu" style={{ visibility: hideSideMenu ? 'hidden' : 'visible' }}>
      <div className="side-menu-scroll">
        <h6>Menu</h6>
        {SideMenuOptions}
        <div className="side-menu-powered-by">
          <img src={hatLogo} className="img img-responsive" alt="HAT Logo" />
          <p>HAT Web app</p>
        </div>
      </div>
    </div>
  );
};
