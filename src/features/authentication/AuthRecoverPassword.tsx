import React, { useState } from 'react';
import './AuthLogin.scss';
import { recoverPassword } from "../../api/hatAPI";
import { AuthApplicationLogo, Input, IssuedBy } from "hmi";
import { isEmail } from "../../utils/validations";
import { selectApplicationHmi, selectApplicationHmiState } from "../applications/applicationsSlice";
import { useSelector } from "react-redux";
import FormatMessage from "../messages/FormatMessage";
import { selectLanguage } from "../language/languageSlice";
import { selectMessages } from "../messages/messagesSlice";

const AuthRecoverPassword: React.FC = () => {
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const language = useSelector(selectLanguage);
  const messages = useSelector(selectMessages);
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
      if (messages) {
        setErrorMessage(messages['ds.auth.error.oops']);
        setErrorSuggestion(messages['ds.auth.error.tryAgain']);
      }
    }
  };

  const validateAndReset = async () => {
    if (isEmail(email)) {
      resetPassword();
    } else {
      if (messages) {
        setErrorMessage(messages['ds.auth.error.notValidUsername']);
        setErrorSuggestion(messages['ds.auth.error.notValidUsernameSuggestion']);
      }
    }
  };

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        {successfulResponse &&
            <>
              <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>
              <h2 className={'auth-login-title'}>
                <FormatMessage id={'ds.auth.recoverPassword.success.title'} />
              </h2>

              <div className={'auth-login-text'} onClick={() => validateAndReset()}>
                <FormatMessage id={'ds.auth.recoverPassword.success.sendAgain'} asHtml={true} />
              </div>
            </>
        }

        {!successfulResponse &&
        <>
          <h2 className={'auth-login-title'}>
            <FormatMessage id={'ds.auth.recoverPassword.title'} />
          </h2>
          <Input type={'email'}
            placeholder={'Email'}
            autoComplete={'email'}
            id={'email'}
            value={email}
            hasError={!!errorMessage}
            errorMessage={errorMessage}
            errorSuggestion={errorSuggestion}
            onChange={e => setEmail(e.target.value)} />

          <button className={'auth-recover-password-btn ds-hmi-btn'}
            disabled={email.length < 3}
            onClick={() => validateAndReset()}
          >
            <FormatMessage id={'ds.auth.recoverPassword.resetBtn'} />
          </button>
        </>
        }

        <IssuedBy language={language}/>
      </div>
    </div>
  );
};

export default AuthRecoverPassword;
