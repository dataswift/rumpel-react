import React, { ReactNode } from 'react';
import './NotificationBanner.scss';

type Props = {
  type: string;
  display: boolean;
  children: ReactNode;
}

export const NotificationBanner: React.FC<Props> = ({ type, children, display }) => {
  return (
    <div>
      {display && (
        <>
          <div className={`notification-banner-container notification-banner-container-${ type }`}>
            {type === 'error' && (
              <i className="material-icons notification-banner-container-icon">warning</i>
            )}
            {children}
          </div>
        </>
      )}
    </div>
  );
};
