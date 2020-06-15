import React from 'react';
import { useSelector } from 'react-redux';
import { selectParentApp } from "./hmiSlice";
import { FormatMessage } from "../messages/FormatMessage";
import { AppLogo } from "../../components/AppLogo/AppLogo";

export const HmiRating: React.FC = () => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }

  const { info } = parentApp.application;

  return (
    <div>
      <div className={'hmi-section-title'}>
        <FormatMessage id={'hatters.hmi.rating.title'} values={{ name: info.name }} />
      </div>
      <div className={'rating-privacy-text'}>
        <FormatMessage id={'hatters.hmi.rating.description.withDataDebit'} values={{ name: info.name }} />
      </div>
      <AppLogo src={info.graphics.logo.normal} rating={info.rating.score} ratingPoints={info.rating.points} />
    </div>
  );
};
