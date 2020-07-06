import React, { ReactNode } from "react";
import './SideMenu.scss';
import { config } from "../../app.config";
import hatLogo from '../../assets/icons/hat-logo.png';
import { Link } from "react-router-dom";

type LinkProps = {
    link: string;
    children: ReactNode;
}

type Props = {
    hideSideMenu: boolean;
}

export const SideMenu: React.FC<Props> = ({ hideSideMenu }) => {
  const SideMenuLink: React.FC<LinkProps> = ({ link, children }) => {
    if (link.startsWith("http")) {
      return <a href={link} className={'side-menu-item-wrapper'}>{children}</a>;
    } else {
      return <Link to={link} className={'side-menu-item-wrapper'}>{children}</Link>;
    }
  };

  const SideMenuOptions = config.mainMenu.map((item, index) => {
    return (
      <div className={'side-menu-item'} key={item.display + index}>
        <div className="tooltip">
          <span className="tooltiptext" id="myTooltip">
            {item.description}
          </span>
          <SideMenuLink link={item.link}>
            <div className={'side-menu-item-icon'}>
              <i className={'material-icons'}>{item.icon}</i>
            </div>
            <div className={'side-menu-item-name'}>
              {item.display}
            </div>
          </SideMenuLink>
        </div>

      </div>
    );
  });

  if (hideSideMenu) {
    return null;
  }

  return (
    <div className={'side-menu'}>
      <h6>Menu</h6>
      {SideMenuOptions}
      <div className={'side-menu-powered-by'}>
        <img src={hatLogo} className="img img-responsive" alt={'HAT Logo'} />
        <p>HAT Web app</p>
      </div>
    </div>
  );
};
