import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { NavigationHeader } from "../headers/NavigationHeader/NavigationHeader";
import { SideMenu } from "../SideMenu/SideMenu";
import './PrivateSpace.scss';

type Props = {
    children: ReactNode;
}

export const PrivateSpace: React.FC<Props> = ({ children }) => {
  const [hideSideMenu, setHideSideMenu] = useState(false);
  const { pathname } = useLocation<{ pathname: string }>();
  const content = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (window.innerWidth < 850) {
      setHideSideMenu(true);
    }
  }, []);
    
  useEffect(() => {
    content.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={'private-space'}>
      <NavigationHeader toggleSideMenu={() => setHideSideMenu(!hideSideMenu)}/>
      <div className={'private-space-wrapper'}>
        <SideMenu hideSideMenu={hideSideMenu}/>
        <div
          className={`private-space-content ${hideSideMenu && 'side-menu-hidden'}`}
          id={'private-space-content'}
          ref={content}>
          {children}
        </div>
      </div>
    </div>
  );
};
