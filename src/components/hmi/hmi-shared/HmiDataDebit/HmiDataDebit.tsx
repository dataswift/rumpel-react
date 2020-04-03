import React from 'react';
import './HmiDataDebit.scss';
import { useSelector } from 'react-redux';
import appLogoPlaceholder from '../../../../assets/icons/app-logo-placeholder.svg';
import dataShareLogo from '../../../../assets/icons/data-share.svg';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { unbundle } from './unbundle';
import { FormatMessage } from '../../../shared/FormatMessage/FormatMessage';
import { selectParentApp } from '../../../../features/hat-login/hatLoginSlice';

export const HmiDataDebit: React.FC = () => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }

  const { permissions, info } = parentApp.application;

  if (permissions.dataRequired && permissions.dataRequired.bundle) {
    const bundle = unbundle(permissions.dataRequired.bundle.bundle);
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

        <ExpansionPanel className={'expansion-panel'} square={false}>
          <ExpansionPanelSummary
            aria-controls="panel1a-content"
            expandIcon={<i className="material-icons">keyboard_arrow_down</i>}
            id="panel1a-header"
          >
            <div className={'hmi-card-title'}>
              <FormatMessage id={'hatters.hmi.dataDebit.useYourData'} />
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={'hmi-card-subtitle'}>
              <FormatMessage id={'hatters.hmi.dataDebit.appAbleToUse'} />
              <br />
              <br />

              {bundle.map((value) => {
                return (
                  <div className={'hmi-data-debit-list-wrapper'} key={value.title}>
                    <div>{value.title} data</div>
                    <ul className={'hmi-data-debit-list'}>
                      {value.fields.map((field) => {
                        return <li key={field}>{field}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </ExpansionPanelDetails>
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
