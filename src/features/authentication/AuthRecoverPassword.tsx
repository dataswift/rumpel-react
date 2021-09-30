import React, { useEffect, useState } from 'react';
import { recoverPassword } from '../../api/hatAPI';
import { AuthApplicationLogo, Input } from 'hmi';
import { isEmail } from '../../utils/validations';
import { selectApplicationHmi, selectApplicationHmiState } from '../applications/applicationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FormatMessage from '../messages/FormatMessage';
import { selectMessages } from '../messages/messagesSlice';
import { getPdaLookupDetails, selectUserPdaLookupDetails } from "./authenticationSlice";

const AuthRecoverPassword: React.FC = () => {
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const messages = useSelector(selectMessages);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState('');
  const pdaDetails = useSelector(selectUserPdaLookupDetails);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);

  const resetPassword = async () => {
    if (!pdaDetails) return;

    try {
      const res = await recoverPassword(
        pdaDetails.hatName + '.' + pdaDetails.hatCluster,
        { email: email })
      ;

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

  const getPdaDetails = async () => {
    const maybeEmail = email || window.localStorage.getItem('session_email');
    if (!maybeEmail) return;

    dispatch(getPdaLookupDetails(maybeEmail));
  };

  const validateAndReset = async () => {
    if (isEmail(email)) {
      // TODO this need a more optimal solution.
      getPdaDetails();
      resetPassword();
    } else {
      if (messages) {
        setErrorMessage(messages['ds.auth.error.notValidUsername']);
        setErrorSuggestion(messages['ds.auth.error.notValidUsernameSuggestion']);
      }
    }
  };

  useEffect(() => {
    if (!pdaDetails) {
      getPdaDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdaDetails]);

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        {successfulResponse && (
          <>
            <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>
            <h2 className={'auth-login-title'}>
              <FormatMessage id={'ds.auth.recoverPassword.success.title'} asHtml />
            </h2>

            <div className={'auth-login-text'} onClick={() => validateAndReset()}>
              <FormatMessage id={'ds.auth.recoverPassword.success.sendAgain'} asHtml />
            </div>
          </>
        )}

        {!successfulResponse && (
          <>
            <h2 className={'auth-login-title'}>
              <FormatMessage id={'ds.auth.recoverPassword.title'} asHtml />
            </h2>
            <Input
              type={'email'}
              placeholder={'Email'}
              autoComplete={'email'}
              id={'email'}
              value={email}
              hasError={!!errorMessage}
              errorMessage={errorMessage}
              errorSuggestion={errorSuggestion}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className={'auth-recover-password-btn ds-hmi-btn ds-hmi-btn-primary'}
              disabled={email.length < 3}
              onClick={() => validateAndReset()}
            >
              <FormatMessage id={'ds.auth.recoverPassword.resetBtn'} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthRecoverPassword;
