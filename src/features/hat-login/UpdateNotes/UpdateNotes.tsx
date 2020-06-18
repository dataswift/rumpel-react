import { HatApplicationContent } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import React from 'react';
import Markdown from 'markdown-to-jsx';
import './UpdateNotes.scss';
import { FormatMessage } from "../../messages/FormatMessage";
import { hmiConfig } from "../../hmi/hmi.config";

type Props = {
  app: HatApplicationContent;
  onApproved: () => void;
  onRejected: () => void;
};
export const UpdateNotes: React.FC<Props> = ({ app, onApproved, onRejected }) => {
  if (!app.info.updateNotes) return null;

  const HmiActions: React.FC = () => {

    if (!app) {
      return null;
    }

    return (
      <div className="hmi-actions-footer">
        <div className="sticky-action-panel-content">
          <div className="action-buttons">
            <button className="secondary-action" onClick={() => onRejected()}>
              <FormatMessage id={'hmi.actions.cancel'} />
            </button>
            <button className="primary-action" onClick={() => onApproved()}>
              <FormatMessage id={'hmi.actions.confirm'} />
            </button>
          </div>

          <p className="tos-text">
            <FormatMessage id={'hmi.actions.agreeWithTermsAndPrivacy.part1'} />
            <a
              href={hmiConfig.links.termsOfService}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormatMessage
                id={'hmi.actions.agreeWithTermsAndPrivacy.termsOfService'}
              />
            </a>
                        ,{' '}
            <a
              href={hmiConfig.links.privacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormatMessage
                id={'hmi.actions.agreeWithTermsAndPrivacy.privacyPolicy'}
              />
            </a>
            <FormatMessage id={'hmi.actions.agreeWithTermsAndPrivacy.part2'} />
          </p>

          <p className="hmi-id-text">
                        HMI ID: {app.id}-{app.info.version}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="content-wrapper flex-column-wrapper flex-align-items-center">
      <section className="title-section">
        <div className="app-logo-wrapper">
          <img src={app.info.graphics.logo.normal}
            className="app-logo" 
            height="100"
            width="100"
            alt={`${ app.info.name } logo`}
          />
        </div>
        {app.kind.kind === 'App' && (
          <div className="app-rating-wrapper">
            <div className="app-rating">
              <span className="app-rating-highlighted">{app.info.rating.score}&nbsp;</span>
            </div>
          </div>
        )}

        <h3 className="title-section-heading">{app.info.name}</h3>
        <div className="title-section-text">
          <Markdown>{app.info.updateNotes.header}</Markdown>
        </div>
      </section>

      <section className="update-notes-section">
        <h4 className="section-header">Summary of updates</h4>
        {app.info.updateNotes.notes && (
          <ul className="app-update-notes">
            {app.info.updateNotes.notes.map((note, index) => {
              return (
                <li className="app-update-notes-item" key={index}>
                  <div className="app-update-notes-item-content">
                    <Markdown>{note}</Markdown>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <HmiActions />
    </div>
  );
};
