import React, { useState } from 'react';
import './AuthLogin.scss';
import { recoverPassword } from "../../api/hatAPI";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { Input } from "hmi";
import { isEmail } from "../../utils/validations";

const AuthRecoverPassword: React.FC = () => {
  const [parentApp, setParentApp] = useState<HatApplicationContent | null>(null);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState("");

  const resetPassword = async () => {
    try {
      const res = await recoverPassword({ email: email });
      if (res) {
        // setSuccessMessage(
        //     'If the email address you have entered is correct, you will shortly receive an email' +
        //     ' with your password reset instructions.'
        // );
      }
    } catch (error) {
      setErrorMessage('Failed to submit password recovery request.');
    }
  };

  const validateAndReset = async () => {
    if (isEmail(email)) {
      resetPassword();
    } else {
      setErrorMessage("This is not a valid username");
      setErrorSuggestion("Please double-check for accuracy or extra spaces.");
    }
  };

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <img className={'auth-login-logo'} src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>
        <h2 className={'auth-login-title'}>Did you forget your password?</h2>
        <Input type={'email'}
          placeholder={'Email'}
          autoComplete={'email'}
          value={email}
          hasError={!!errorMessage}
          errorMessage={errorMessage}
          errorSuggestion={errorSuggestion}
          onChange={e => setEmail(e.target.value)} />

        <button className={'auth-recover-password-btn ds-hmi-btn'}
          disabled={email.length < 3}
          onClick={() => validateAndReset()}
        >
                    Reset Password
        </button>

        <div className={'ds-hmi-footer'}>
          <p>Issued by:</p>
          <img
            src={'https://cdn.dataswift.io/dataswift/logo/ds-full-dark.svg'}
            alt={'Dataswift'}
          />
          <p>
                        Dataswift provides Personal Data Accounts that make it possible
                        for you to own and securely control your personal data in the
                        cloud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthRecoverPassword;
