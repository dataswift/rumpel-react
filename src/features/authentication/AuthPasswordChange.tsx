import React, { ChangeEvent, useEffect, useState } from 'react';
import './AuthLogin.scss';
import { resetPassword } from "../../api/hatAPI";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { Input, IssuedBy } from "hmi";
import { PasswordStrengthIndicator } from "../../components/PasswordStrengthMeter/PasswordStrengthIndicator";
import { loadDynamicZxcvbn } from "../../utils/load-dynamic-zxcvbn";
import { useParams } from "react-router";

declare const zxcvbn: any;

const AuthPasswordChange: React.FC = () => {
  const [parentApp, setParentApp] = useState<HatApplicationContent | null>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | undefined>(undefined);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);
  let { resetToken } = useParams();

  const resetPasswordRequest = async () => {
    try {
      const res = await resetPassword(resetToken, { newPassword: password });

      if (res) {
        setSuccessfulResponse(new Date());
      }
    } catch (error) {
      // setErrorMessage('Oops!');
      // setErrorSuggestion("It seems there was a glitch in the matrix. Please try again.");
    }
  };

  const validatePassword = (password: string) => {
    if (!zxcvbn) return;

    setPassword(password);
    const score = zxcvbn(password).score;
    setScore(score);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password-1") {
      validatePassword(value);
    } else if (name === "password-2") {
      setPasswordConfirm(value);
    }
  };

  const validateAndReset = async () => {
    if (password === passwordConfirm) {
      resetPasswordRequest();
    }
  };

  useEffect(() => {
    loadDynamicZxcvbn(() => {
      // zxcvbn ready
    });
  }, []);

  useEffect(() => {
    if (score > 2) {
      if (password === passwordConfirm) {
        setPasswordMatch(true);
      } else {
        if (passwordConfirm.length > 5) {
          setPasswordMatch(false);
        }
      }
    } else {
      setPasswordMatch(undefined);
    }
  }, [password, passwordConfirm, score]);

  return (
    <div>
      <div className={'flex-column-wrapper auth-login auth-change-password'}>
        <img className={'auth-login-logo'} src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>
        {successfulResponse &&
                <>
                  <h2 className={'ds-hmi-email auth-login-email-title'}>changeme.gmail.com</h2>
                  <h2 className={'auth-login-title'}>
                    If this email address is an active account, you will receive an email shortly.
                  </h2>

                  <div className={'auth-login-text'}>
                    if you do not receive a reset link, check your spam folder or<br />
                    <span onClick={() => validateAndReset()}>send again</span>.
                  </div>
                </>
        }
        <h2 className={'ds-hmi-email auth-login-email-title'}>changeme.mail.com</h2>

        <h2 className={'auth-login-title'}>Reset password</h2>
        <Input type={'password'}
          placeholder={'Password'}
          autoComplete={'new-password-1'}
          name={'password-1'}
          value={password}
          hasError={!!errorMessage}
          errorMessage={errorMessage}
          passwordMatch={passwordMatch}
          errorSuggestion={errorSuggestion}
          onChange={e => onPasswordChange(e)} />

        {password.length > 0 &&
          <PasswordStrengthIndicator strong={score > 2} passwordMatch={passwordMatch}/>
        }

        {score >= 3 &&
          <Input type={'password'}
            placeholder={'Confirm Password'}
            autoComplete={'new-password-2'}
            name={'password-2'}
            value={passwordConfirm}
            hasError={!!errorMessage}
            errorMessage={errorMessage}
            errorSuggestion={errorSuggestion}
            passwordMatch={passwordMatch}
            onChange={e => onPasswordChange(e)}
          />
        }

        <button className={'auth-login-btn ds-hmi-btn'}
          disabled={score < 3 || !passwordMatch}
          onClick={() => validateAndReset()}
        >
                    Next
        </button>

        <IssuedBy />
      </div>
    </div>
  );
};

export default AuthPasswordChange;
