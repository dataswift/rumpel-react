import React, { useState } from 'react';
import { AuthApplicationLogo } from 'hmi';

import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import FormatMessage from "../../../features/messages/FormatMessage";
import { resendVerificationEmail } from "../../../services/HattersService";

type Props = {
  email: string;
  skipEmailVerification?: boolean;
  redirectUri: string;
  parentApp: HatApplicationContent;
};

const RegistrationConfirmYourIdentity: React.FC<Props> = ({ parentApp, email, redirectUri, skipEmailVerification }) => {
  // const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;
  const [resendEmailState, setResendEmailState] = useState('idle');

  const resendEmail = async () => {
    try {
      // onClickEvent?.(AnalyticsClickEvents.resendEmailActivationButton);

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
    <>
      <div className={'flex-column-wrapper signup'}>
        <AuthApplicationLogo src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name} />

        <h2 className={'ds-hmi-email signup-email-title'}>{email}</h2>

        <h2 className={'signup-title'}>
          <FormatMessage
            id={
              skipEmailVerification
                ? 'hatters.auth.confirmYourIdentity.accountIsReady'
                : 'hatters.auth.confirmYourIdentity.title'
            }
          />
        </h2>

        {!skipEmailVerification && (
          <button className={'signup-btn-secondary'} onClick={() => resendEmail()}>
            <FormatMessage id={'hatters.auth.confirmYourIdentity.resendActivationEmail'} />
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
          </button>
        )}
        <div className={'signup-help-text'} onClick={() => {}}>
          <FormatMessage id={'hatters.auth.confirmYourIdentity.needHelp'} asHtml />
        </div>
      </div>
    </>
  );
};

export default RegistrationConfirmYourIdentity;
