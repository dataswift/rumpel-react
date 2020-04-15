import React, { useEffect, useState } from 'react';
import './PasswordRecover.scss';
import { InfoHeader } from '../../shared/headers/InfoHeader/InfoHeader';
import {recoverPassword} from "../../../api/hatAPI";

const PasswordRecover: React.FC = () => {
    const [email, setEmail] = useState('');
    const [hatName, setHatName] = useState('');
  const [hatDomain, setHatDomain] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const resetPassword = async () => {
      try {
          const res = await recoverPassword({email: email});
          if (res) {
              setSuccessMsg('If the email address you have entered is correct, you will shortly receive an email'
                  + ' with your password reset instructions.')
          }
      } catch (error) {
          console.warn('Failed to recover password. Reason: ', error);
          setErrorMsg("ERROR: Failed to submit password recovery request.")
      }
  };

  useEffect(() => {
    const host = window.location.hostname;

    setHatName(host.substring(0, host.indexOf('.')));
    setHatDomain(host.substring(host.indexOf('.')));
  }, []);

  return (
    <div className={'password-recover flex-column-wrapper'}>
      <InfoHeader />
      <span className={'flex-spacer-small'} />

      <div className="password-recover-title title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>{hatDomain}</h3>
        </div>
      </div>
      <input
        id="hatEmail"
        type="email"
        className="hat-rumpel-input"
        name="hat-pass-input"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter HAT-registered email address"
        onFocus={() => setErrorMsg('')}
      />
        {successMsg && <div className={'notification notification-success'}>{successMsg}</div>}
        {errorMsg && <div className={'notification notification-error'}>{errorMsg}</div>}

      <div className="password-recover-description">
        If you are the owner of this HAT, please enter your registered email address
      </div>

      <span className={'flex-spacer-small'} />

      <div className="user-actions">
        <button role="button" type="submit" className="btn btn-accent" onClick={() => resetPassword()}>
          Reset Password
        </button>
      </div>

      <span className={'flex-spacer-small'} />
    </div>
  );
};

export default PasswordRecover;
