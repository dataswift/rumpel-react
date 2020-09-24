import React, { useState } from 'react';
import './AuthLogin.scss';
import { recoverPassword } from "../../api/hatAPI";
import { Input, IssuedBy } from "hmi";
import { isEmail } from "../../utils/validations";
import { selectApplicationsHmi } from "../applications/applicationsSlice";
import { useSelector } from "react-redux";

const AuthRecoverPassword: React.FC = () => {
  const parentApp = useSelector(selectApplicationsHmi);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState("");
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);

  const resetPassword = async () => {
    try {
      const res = await recoverPassword({ email: email });

      if (res) {
        setSuccessfulResponse(new Date());
      }
    } catch (error) {
      setErrorMessage('Oops!');
      setErrorSuggestion("It seems there was a glitch in the matrix. Please try again.");
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
        <div className={'auth-login-logo-wrapper'}>
          {parentApp?.info.graphics.logo.normal &&
          <img className={'auth-login-logo'} src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>
          }
        </div>

        {successfulResponse &&
            <>
              <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>
              <h2 className={'auth-login-title'}>
                If this email address is an active account, you will receive an email shortly.
              </h2>

              <div className={'auth-login-text'}>
                if you do not receive a reset link, check your spam folder or<br />
                <span onClick={() => validateAndReset()}>send again</span>.
              </div>
            </>
        }

        {!successfulResponse &&
        <>
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
        </>
        }

        <IssuedBy />
      </div>
    </div>
  );
};

export default AuthRecoverPassword;
