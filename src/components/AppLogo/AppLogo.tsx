import React from 'react';
import './AppLogo.scss';
import placeholder from '../../assets/icons/app-logo-placeholder.svg';
import { FormatMessage } from "../../features/messages/FormatMessage";
import { useSelector } from "react-redux";
import { selectParentApp } from "../../features/hmi/hmiSlice";

const AppLogoRating: React.FC<OwnProps> = props => {
  const parentApp = useSelector(selectParentApp);
  return (
    <>
      {props.rating && (
        <>
          <div className="app-rating-wrapper">
            <div className={`app-rating`}>
              <span className="app-rating-highlighted">{props.rating}</span>
            </div>
            <div className={'app-rating-assured'}>
              <FormatMessage id={'hatters.hmi.rating.assured'} />
            </div>
          </div>

          <div className="app-details-header-headline">
            {parentApp?.application.info.name || ""}
          </div>
          <a
            href="https://www.hatcommunity.org/hat-dex-rating"
            target="_blank"
            className="app-link"
            rel="noopener noreferrer"
          >
            <FormatMessage id={'hatters.hmi.rating.learnMore'} />
          </a>
        </>
      )}
    </>
  );
};

export const AppLogo: React.FC<OwnProps> = props => {
  return (
    <div className={'app-logo-container'}>
      <div className="app-logo-wrapper">
        <img src={props.src || placeholder} alt={'Application logo'} className="img img-responsive app-logo" />
      </div>

      <AppLogoRating {...props} />
    </div>
  );
};

interface OwnProps {
  src: string;
  rating?: string;
  ratingPoints?: number;
}
