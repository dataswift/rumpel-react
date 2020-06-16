import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/icons/hat-data-rights-icon.svg';
import { selectParentApp } from "./hmiSlice";

export const HmiDaasHeader: React.FC = () => {
  const hatName = window.location.host;
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }
  const hmiDescription = parentApp.application.info.hmiDescription;

  return (
    <div className={'hmi-daas-header-wrapper'}>
      <div className={'hmi-section-title'}>{hatName}</div>

      <div className={'hmi-text-grey'}>
        {hmiDescription ||
          `${ parentApp.application.info.name } have requested for a Personal Data Account 
          to be created with the above URL. Check your email for further details.`
        }
      </div>

      <div className={'hmi-separator'} />

      <img className={'hmi-data-rights-img'} src={logo} alt={'HAT Data rights protected'} />
    </div>
  );
};
