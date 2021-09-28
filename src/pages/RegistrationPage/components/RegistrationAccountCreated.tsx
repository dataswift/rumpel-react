import React, { useContext, useState } from 'react';
import { AnalyticsContext, AuthApplicationLogo } from 'hmi';

import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import FormatMessage from "../../../features/messages/FormatMessage";
import { resendVerificationEmail } from "../../../services/HattersService";
import { AnalyticsClickEvents } from "../../../utils/AnalyticsEvents";

type Props = {
  parentApp: HatApplicationContent;
  email: string;
  redirectUri: string;
}

const RegistrationAccountCreated: React.FC<Props> = ({ parentApp, email, redirectUri }) => {
  const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;
  const [resendEmailState, setResendEmailState] = useState('idle');

  const resendEmail = async () => {
    try {
      onClickEvent?.(AnalyticsClickEvents.resendEmailActivationButton);

      if (!parentApp || !redirectUri) {
        setResendEmailState('error');
        return;
      }
      setResendEmailState('pending');

      const res = await resendVerificationEmail(email, redirectUri, !parentApp.info.published);

      if (res.parsedBody) {
        setResendEmailState('success');
      }
    } catch (e) {
      setResendEmailState('error');
    }
  };

  return (
    <div className={'flex-column-wrapper signup'}>
      <AuthApplicationLogo src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name} />

      <div className="signup-card">
        <h2 className={'signup-title'}>
          <b>
            <FormatMessage id="hatters.auth.signup.accountCreated" />
          </b>
        </h2>

        <div className="signup-check-your-email">
          <FormatMessage id="hatters.auth.signup.accountCreated.confirm" />
        </div>

        <div className="signup-keep-this-window-open link-text flex-column-wrapper" onClick={resendEmail}>
          <FormatMessage id="hatters.auth.signup.accountCreated.resend" />

          {resendEmailState === 'error' && (
            <i className={'material-icons'} style={{ color: '#e50d42' }}>
              error_outline
            </i>
          )}
          {resendEmailState === 'success' && (
            <i className={'material-icons'} style={{ color: '#a8c62b' }}>
              done
            </i>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationAccountCreated;
