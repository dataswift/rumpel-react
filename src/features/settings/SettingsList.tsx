import React from 'react';
import { Link } from 'react-router-dom';

import { config } from '../../app.config';
import FormatMessage from '../messages/FormatMessage';

export interface SettingsListProps {}

const isExternalLink = (link: string): boolean => {
  if ((!link.includes('.md') && link.includes('http')) || link.includes('mailto')) return true;

  return false;
};

const SettingsList: React.FC<SettingsListProps> = () => {
  const onExternalClick = (link: string) => (window.location.href = link);

  return (
    <div className="settings-list-wrapper">
      <div className="settings-list">
        <h3 className="settings-list-title">
          <FormatMessage id="ds.hat.settings.list.header.privateData" />
        </h3>

        {config.settingsPrivateDataMenu.map((item) => {
          return (
            <div className="settings-list-item link" key={item.display}>
              <h3 className="settings-list-row-text">{item.display}</h3>
              <i className="material-icons">{item.icon}</i>
            </div>
          );
        })}

        <h3 className="settings-list-title">
          <FormatMessage id="ds.hat.settings.list.header.settings" />
        </h3>

        {config.settingsMenu.map((item) => {
          return isExternalLink(item.link) ? (
            <div className="settings-list-item link" onClick={() => onExternalClick(item.link)} key={item.display}>
              <h3 className="settings-list-row-text">{item.display}</h3>
              <i className="material-icons">{item.icon}</i>
            </div>
          ) : (
            <Link className="settings-list-item link" to={item.link} key={item.display}>
              <h3 className="settings-list-row-text">{item.display}</h3>
              <i className="material-icons">{item.icon}</i>
            </Link>
          );
        })}

        <h3 className="settings-list-title">
          <FormatMessage id="ds.hat.settings.list.header.version" />
        </h3>
        <div className="settings-list-item">
          <h3 className="settings-list-row-text">{config.version}</h3>
        </div>

        <h3 className="settings-list-title">
          <FormatMessage id="ds.hat.settings.list.header.vendor" />
        </h3>
        <div className="settings-list-item">
          <h3 className="settings-list-row-text">HAT App</h3>
        </div>

        <h3 className="settings-list-title">
          <FormatMessage id="ds.hat.settings.list.header.issuer" />
        </h3>
        <div className="settings-list-item">
          <h3 className="settings-list-row-text">Dataswift Ltd.</h3>
        </div>
      </div>
    </div>
  );
};

export default SettingsList;
