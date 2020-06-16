import React from 'react';
import { useSelector } from 'react-redux';
import appLogoPlaceholder from '../../assets/icons/app-logo-placeholder.svg';
import dataShareLogo from '../../assets/icons/data-share.svg';
import { selectParentApp } from "./hmiSlice";
import { unbundle } from "../../utils/unbundle";
import { FormatMessage } from "../messages/FormatMessage";
import ExpansionPanel from "../../components/ExpansionPanel/ExpansionPanel";

export const HmiDataDebit: React.FC = () => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }

  const { permissions, info } = parentApp.application;

  if (permissions.dataRetrieved && permissions.dataRetrieved.bundle) {
    const bundle = unbundle(permissions.dataRetrieved.bundle);
    const logo = info.graphics.logo.normal;

    return (
      <div className={'hmi-data-debit'}>
        <div className={'hmi-data-share-wrapper'}>
          <img className={'data-share-icon'} src={dataShareLogo} alt={'Data share logo'} />
          <img className={'data-share-logo'} src={logo || appLogoPlaceholder} alt={'Application logo'} />
        </div>
        <div className={'hmi-section-title'}>
          <FormatMessage
            id={'hatters.hmi.dataDebit.title'}
            values={{
              name: info.name,
            }}
          />
        </div>
        <div className={'hmi-text-grey'}>
          <FormatMessage id={'hatters.hmi.dataDebit.givingPermissions'} />
        </div>

        <ExpansionPanel title={'hatters.hmi.dataDebit.useYourData'}>
          <div className={'hmi-card-subtitle hmi-card-content'}>
            <FormatMessage id={'hatters.hmi.dataDebit.appAbleToUse'}
              values={{ name: parentApp.application.info.name }} />
            <br />
            <br />

            {bundle.map(value => {
              return (
                <div className={'hmi-data-debit-list-wrapper'} key={value.title}>
                  <div>{value.title} data</div>
                  <ul className={'hmi-data-debit-list'}>
                    {value.fields.map(field => {
                      return <li key={field}>{field}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </ExpansionPanel>

        <div className={'hmi-card'}>
          <div className={'hmi-card-content'}>
            <div className={'hmi-card-title'}>
              <FormatMessage id={'hatters.hmi.dataDebit.purposeOfDataUsage'} />
            </div>
            <div className={'hmi-card-subtitle'}>{info.dataUsePurpose}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
