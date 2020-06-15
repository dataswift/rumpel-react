import React from 'react';
import './AppCard.scss';
import logo from '../../assets/icons/data-plug-lego-icon.png';

export const AppCard: React.FC<OwnProps> = props => {
  return (
    <div className={'app-card-container'}>
      <div className={`app-card-img-wrapper app-card-img-${ props.appId }`}>
        <img src={logo} alt={'Data plug'} />
      </div>
      <div className={'app-card-name'}>{props.appName}</div>
    </div>
  );
};

interface OwnProps {
  appId: string;
  appName: string;
}
