import React, { ReactNode } from 'react';
import './NotificationBanner.scss';

type Props = {
  type: string;
  display: boolean;
  children: ReactNode;
  fixed?: boolean;
};

export const NotificationBanner: React.FC<Props> = ({ type, children, fixed, display }) => {
  return (
    <div>
      {display && (
        <>
          <div
            className={`notification-banner-container 
            notification-banner-container-${type} 
            ${fixed ? 'notification-fixed' : null}`}
          >
            {type === 'error' && <i className="material-icons notification-banner-container-icon">warning</i>}
            {children}
          </div>
        </>
      )}
    </div>
  );
};
