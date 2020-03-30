import React from 'react';
import './HmiRating.scss';
import { useSelector } from 'react-redux';
import {selectParentApp} from "../../../../features/hat-login/hatLoginSlice";
import {FormatMessage} from "../../../shared/FormatMessage/FormatMessage";
import {AppLogo} from "../../../shared/AppLogo/AppLogo";

export const HmiRating: React.FC = () => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }

  const {info} = parentApp.application;

  return (
    <div>
      <div className={'hmi-section-title'}>
        <FormatMessage id={'hatters.hmi.rating.title'} values={{ name: info.name }} />
      </div>
      <div className={'rating-privacy-text'}>
        <FormatMessage id={'hatters.hmi.rating.description.withDataDebit'} values={{ name: info.name }} />
      </div>
      <AppLogo
        src={info.graphics.logo.normal}
        rating={info.rating.score}
        ratingPoints={info.rating.points}
      />
    </div>
  );
};
