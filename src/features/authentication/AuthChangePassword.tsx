import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AgreementsModal, AuthApplicationLogo, Input } from 'hmi';
import { useHistory, useParams } from 'react-router';

import * as queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadDynamicZxcvbn } from '../../utils/load-dynamic-zxcvbn';
import { PasswordStrengthIndicator } from '../../components/PasswordStrengthMeter/PasswordStrengthIndicator';
import { resetPassword } from '../../api/hatAPI';
import {
  getApplicationHmi,
  selectApplicationHmi,
  selectApplicationHmiState,
  setAppsHmiState,
} from '../applications/applicationsSlice';
import FormatMessage from '../messages/FormatMessage';
import { selectLanguage } from '../language/languageSlice';
import { selectMessages } from '../messages/messagesSlice';
import { isEmail } from '../../utils/validations';
import { getPdaLookupDetails, selectUserPdaLookupDetails } from './authenticationSlice';

type Query = {
  email?: string;
  application_id?: string;
  lang?: string;
  redirect_uri?: string;
};

const debounce = require('lodash.debounce');

declare const zxcvbn: (pass: string) => { score: number };

type ChangePasswordProps = {
  passwordStrength: (password: string) => { score: number };
};

export const AuthChangePassword: React.FC<ChangePasswordProps> = ({ passwordStrength }) => {
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const language = useSelector(selectLanguage);
  const messages = useSelector(selectMessages);
  const history = useHistory();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState('');
  const pdaDetails = useSelector(selectUserPdaLookupDetails);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | undefined>(undefined);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);
  const { resetToken } = useParams<{ resetToken: string }>();
  const passwordMatchDebounce = useRef(
    debounce(
      (password: string, passwordConfirm: string, score: number) =>
        validatePasswordMatch(password, passwordConfirm, score),
      400,
    ),
  ).current;

  const validatePasswordScoreDebounce = useRef(
    debounce((password: string) => validatePassword(password), 400),
  ).current;

  const validatePasswordMatch = (password: string, passwordConfirm: string, score: number) => {
    if (score > 2) {
      if (password === passwordConfirm) {
        setPasswordMatch(true);
      } else if (passwordConfirm.length > 0 || passwordMatch) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(undefined);
      }
    } else {
      setPasswordMatch(undefined);
    }
  };

  const resetPasswordRequest = async () => {
    try {
      if (!pdaDetails) return;

      const res = await resetPassword(
        `${pdaDetails.hatName}.${pdaDetails.hatCluster}`,
        resetToken,
        { newPassword: password },
      );

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

  const validatePassword = (password: string) => {
    if (!passwordStrength) return;

    const { score } = passwordStrength(password);
    setScore(score);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'password-1') {
      setPassword(value);
      validatePasswordScoreDebounce(value);
    } else if (name === 'password-2') {
      setPasswordConfirm(value);
    }
  };

  const validateAndReset = async () => {
    if (password === passwordConfirm) {
      resetPasswordRequest();
    }
  };

  const login = async () => {
    if (successfulResponse) {
      const { application_id, redirect_uri, email, lang } = queryString.parse(
        window.location.search,
      ) as Query;

      if (redirect_uri && application_id) {
        // eslint-disable-next-line max-len
        const path = `/auth/oauth?application_id=${application_id}&redirect_uri=${redirect_uri}&email=${email}&lang=${lang}`;
        history.replace(path);
      } else {
        history.replace('/auth/login');
      }
    }
  };

  const getPdaDetails = async (emailAddress?: string) => {
    const maybeEmail = emailAddress || window.localStorage.getItem('session_email');
    if (!maybeEmail) return;

    dispatch(getPdaLookupDetails(maybeEmail));
  };

  useEffect(() => {
    const { email, application_id } = queryString.parse(location.search) as Query;
    if (email && isEmail(email) && !pdaDetails) {
      setEmail(email);
      getPdaDetails(email);
    }

    if (!parentApp && application_id && pdaDetails) {
      dispatch(getApplicationHmi(application_id, `${pdaDetails.hatName}.${pdaDetails.hatCluster}`));
    } else {
      dispatch(setAppsHmiState('completed'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, parentApp, pdaDetails]);

  useEffect(() => {
    passwordMatchDebounce(password, passwordConfirm, score);
  }, [password, passwordConfirm, score, passwordMatchDebounce]);

  return (
    <div>
      <div className="flex-column-wrapper auth-login auth-change-password">
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        <h2 className="ds-hmi-email auth-login-email-title">{email}</h2>

        {successfulResponse && (
          <>
            <h2 className="auth-login-title">
              <FormatMessage id="ds.auth.changePassword.success.title" asHtml />
            </h2>

            <button
              className="auth-login-btn ds-hmi-btn ds-hmi-btn-primary"
              onClick={() => login()}
            >
              <FormatMessage id="ds.auth.loginBtn" />
            </button>
          </>
        )}

        {!successfulResponse && (
          <>
            <h2 className="auth-login-title">
              <FormatMessage id="ds.auth.changePassword.title" asHtml />
            </h2>
            <Input
              type="password"
              autoComplete="new-password"
              name="password-1"
              id="password-1"
              placeholder={messages['ds.auth.input.password']}
              value={password}
              hasError={!!errorMessage}
              passwordMatch={passwordMatch}
              onChange={(e) => onPasswordChange(e)}
            />

            {score > 0 && (
              <PasswordStrengthIndicator strong={score > 2} passwordMatch={passwordMatch} />
            )}

            <Input
              type="password"
              placeholder={messages['ds.auth.input.confirmPassword']}
              autoComplete="new-password"
              name="password-2"
              id="password-2"
              hidden={score < 3 && passwordConfirm.length === 0}
              value={passwordConfirm}
              hasError={!!errorMessage}
              errorMessage={errorMessage}
              errorSuggestion={errorSuggestion}
              passwordMatch={passwordMatch}
              onChange={(e) => onPasswordChange(e)}
            />

            {passwordMatch && (
              <div className="auth-login-text" onClick={() => setOpenPopup(!openPopup)}>
                <FormatMessage id="ds.auth.changePassword.byProceeding" asHtml />
              </div>
            )}

            <button
              className="auth-login-btn ds-hmi-btn ds-hmi-btn-primary"
              disabled={score < 3 || !passwordMatch}
              onClick={() => validateAndReset()}
            >
              <FormatMessage id="ds.auth.nextBtn" />
            </button>
          </>
        )}
        <AgreementsModal
          language={language}
          open={openPopup}
          onClose={() => setOpenPopup(!openPopup)}
        />
      </div>
    </div>
  );
};

const AuthChangePasswordContainer: React.FC = () => {
  const [zxcvbnReady, setZxcvbnReady] = useState(false);

  useEffect(() => {
    loadDynamicZxcvbn(() => {
      // zxcvbn ready
      setZxcvbnReady(true);
    });
  }, []);

  if (!zxcvbnReady) return null;

  return <AuthChangePassword passwordStrength={zxcvbn} />;
};

export default AuthChangePasswordContainer;
