import React, { useEffect, useState } from 'react';
import { PasswordMeter } from '../Svgs/PasswordMeter';
import './PasswordStrengthIndicator.scss';
import FormatMessage from '../../features/messages/FormatMessage';

type Props = {
  strong: boolean;
  passwordMatch?: boolean;
};

export const PasswordStrengthIndicator: React.FC<Props> = ({ strong, passwordMatch }) => {
  const [message, setMessage] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    if (strong) {
      if (typeof passwordMatch === 'undefined') {
        setTextColor('#a8c62b');
        setMessage('ds.auth.passwordIndicator.strongPassword');
      } else if (passwordMatch) {
        setTextColor('#a8c62b');
        setMessage('ds.auth.passwordIndicator.passwordsMatch');
      } else if (!passwordMatch) {
        setTextColor('#F45F09');
        setMessage('ds.auth.passwordIndicator.passwordsDoNotMatch');
      }
    } else {
      setTextColor('#F45F09');
      setMessage('ds.auth.passwordIndicator.passwordMustBeStronger');
    }
  }, [strong, passwordMatch]);

  return (
    <div className="password-strength">
      <PasswordMeter strong={strong} />
      <div className="password-strength-message" style={{ color: textColor }}>
        <FormatMessage id={message} />
      </div>
      {!strong && (
        <div className="password-strength-text">
          <FormatMessage id="ds.auth.passwordIndicator.passwordMustBeStrongerSuggestion" asHtml />
        </div>
      )}
    </div>
  );
};
