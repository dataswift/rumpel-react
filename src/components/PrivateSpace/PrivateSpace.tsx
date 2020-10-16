import React, { ReactNode, useEffect, useState } from 'react';
import { NavigationHeader } from "../headers/NavigationHeader/NavigationHeader";
import { SideMenu } from "../SideMenu/SideMenu";
import './PrivateSpace.scss';

type Props = {
    children: ReactNode;
}

export const PrivateSpace: React.FC<Props> = ({ children }) => {
  const [hideSideMenu, setHideSideMenu] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 850) {
      setHideSideMenu(true);
    }
  }, []);

  return (
    <div className={'private-space'}>
      <NavigationHeader toggleSideMenu={() => setHideSideMenu(!hideSideMenu)}/>
      <div className={'private-space-wrapper'}>
        <SideMenu hideSideMenu={hideSideMenu}/>
        <div className={'private-space-content'} id={'private-space-content'}>
          {children}
        </div>
      </div>
    </div>
  );
};
