import React, { ReactNode } from 'react';
import { NavigationHeader } from "../headers/NavigationHeader/NavigationHeader";
import { SideMenu } from "../SideMenu/SideMenu";
import './PrivateSpace.scss';

type Props = {
    children: ReactNode;
}
export const PrivateSpace: React.FC<Props> = ({ children }) => {
  return (
    <div className={'private-space'}>
      <NavigationHeader />
      <div className={'private-space-wrapper'}>
        <SideMenu />
        <div className={'private-space-content'}>
          {children}
        </div>
      </div>
    </div>
  );
};
