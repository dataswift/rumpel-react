import React from 'react';
import { useSelector } from 'react-redux';
import { HmiType } from "./hmi.interface";
import { selectParentApp } from "./hmiSlice";
import { FormatMessage } from "../messages/FormatMessage";

type Props = {
  registrationType: HmiType;
  nextStep: () => void;
  cancelStep: () => void;
};

export const HmiActions: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp) {
    return null;
  }

  return (
    <div className="hmi-actions-footer">
      <div className="sticky-action-panel-content">
        <div className="action-buttons">
          <button className="secondary-action" onClick={() => props.cancelStep()}>
            <FormatMessage id={'hatters.hmi.actions.cancel'} />
          </button>
          <button className="primary-action" onClick={() => props.nextStep()}>
            <FormatMessage id={'hatters.hmi.actions.confirm'} />
          </button>
        </div>

        <p className="tos-text">
          <FormatMessage id={'hatters.hmi.actions.agreeWithTermsAndPrivacy.part1'} />
          <a
            href="https://cdn.dataswift.io/legal/hat-owner-terms-of-service.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormatMessage id={'hatters.hmi.actions.agreeWithTermsAndPrivacy.termsOfService'} />
          </a>
          ,{' '}
          <a
            href="https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormatMessage id={'hatters.hmi.actions.agreeWithTermsAndPrivacy.privacyPolicy'} />
          </a>
          <FormatMessage id={'hatters.hmi.actions.agreeWithTermsAndPrivacy.part2'} />
        </p>

        <p className="hmi-id-text">
          HMI ID: {parentApp.application.id}-{parentApp.application.info.version}
        </p>
      </div>
    </div>
  );
};
