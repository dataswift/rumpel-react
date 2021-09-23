import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import './AuthLogin.scss';
import { AgreementsModal, AuthApplicationLogo, Input } from 'hmi';
import { PasswordStrengthIndicator } from '../../components/PasswordStrengthMeter/PasswordStrengthIndicator';
import { loadDynamicZxcvbn } from '../../utils/load-dynamic-zxcvbn';
import { useHistory, useParams } from 'react-router';

import * as queryString from 'query-string';
import { buildClaimRequest } from '../hat-claim/hat-claim.service';
import { HatClaim } from '../hat-claim/hat-claim.interface';
import { useDispatch, useSelector } from 'react-redux';
import {
  getApplicationHmi,
  selectApplicationHmi,
  selectApplicationHmiState,
  setAppsHmiState,
} from '../applications/applicationsSlice';
import { selectLanguage } from '../language/languageSlice';
import { selectMessages } from '../messages/messagesSlice';
import FormatMessage from '../messages/FormatMessage';
import { verifyEmail } from '../../api/hatAPI';
import { isEmail } from '../../utils/validations';
import { useLocation } from "react-router-dom";
import { getPdaLookupDetails, selectUserPdaLookupDetails } from "./authenticationSlice";

type Query = {
  email?: string;
  application_id?: string;
  lang?: string;
  redirect_uri?: string;
};

const debounce = require('lodash.debounce');

declare const zxcvbn: (pass: string) => { score: number };

type AuthVerifyEmailProps = {
  passwordStrength: (password: string) => { score: number };
};

export const AuthVerifyEmail: React.FC<AuthVerifyEmailProps> = ({ passwordStrength }) => {
  const history = useHistory();
  const location = useLocation();
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const language = useSelector(selectLanguage);
  const messages = useSelector(selectMessages);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState('');
  const pdaDetails = useSelector(selectUserPdaLookupDetails);
  const [openPopup, setOpenPopup] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | undefined>(undefined);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);
  let { verifyToken } = useParams<{ verifyToken: string }>();

  const dispatch = useDispatch();
  const passwordMatchDebounce = useRef(
    debounce(
      (password: string, passwordConfirm: string, score: number) =>
        validatePasswordMatch(password, passwordConfirm, score),
      400,
    ),
  ).current;

  const validatePasswordScoreDebounce = useRef(debounce((password: string) => validatePassword(password), 400)).current;

  const validatePasswordMatch = (password: string, passwordConfirm: string, score: number) => {
    if (score > 2) {
      if (password === passwordConfirm) {
        setPasswordMatch(true);
      } else {
        if (passwordConfirm.length > 0 || passwordMatch) {
          setPasswordMatch(false);
        } else {
          setPasswordMatch(undefined);
        }
      }
    } else {
      setPasswordMatch(undefined);
    }
  };

  const validateEmailAddress = async () => {
    try {
      if (!pdaDetails) return;

      const hatName = pdaDetails.hatName;
      const hatCluster = pdaDetails.hatCluster;

      const hatClaim: HatClaim = {
        email: email,
        hatName: hatName,
        hatCluster: hatCluster,
        optins: false,
        password: password,
        termsAgreed: true,
      };

      const res = await verifyEmail(verifyToken || '', buildClaimRequest(hatClaim));

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

    const score = passwordStrength(password).score;
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

  const validatePasswordAndRequest = async () => {
    if (password === passwordConfirm) {
      validateEmailAddress();
    }
  };

  const login = useCallback(async () => {
    const { application_id, redirect_uri, email, lang } = queryString.parse(location.search) as Query;

    if (redirect_uri && application_id) {
      // eslint-disable-next-line max-len
      const path = `/auth/oauth?application_id=${application_id}&redirect_uri=${redirect_uri}&email=${email}&lang=${lang}`;
      history.replace(path);
    } else {
      history.replace('/auth/login', { query: { email, lang } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const getPdaDetails = async (emailAddress?: string) => {
    if (!emailAddress) return;
    dispatch(getPdaLookupDetails(emailAddress));
  };

  useEffect(() => {
    const { email, application_id } = queryString.parse(location.search) as Query;
    if (email && isEmail(email) && !pdaDetails) {
      setEmail(email);
      getPdaDetails(email);
    }

    if (!parentApp && application_id && pdaDetails) {
      dispatch(getApplicationHmi(application_id, pdaDetails.hatName + '.' + pdaDetails.hatCluster));
    } else {
      dispatch(setAppsHmiState('completed'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, parentApp, pdaDetails]);

  useEffect(() => {
    passwordMatchDebounce(password, passwordConfirm, score);
  }, [password, passwordConfirm, score, passwordMatchDebounce]);

  useEffect(() => {
    if (pdaDetails?.verified) {
      login();
    }
  }, [pdaDetails, login]);

  return (
    <div>
      <div className={'flex-column-wrapper auth-login auth-change-password'}>
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>

        {successfulResponse && (
          <>
            <h2 className={'auth-login-title'}>
              <FormatMessage id={'ds.auth.verifyEmail.success.title'} asHtml />
            </h2>

            <button className={'auth-login-btn ds-hmi-btn ds-hmi-btn-primary'} onClick={() => login()}>
              <FormatMessage id={'ds.auth.continueBtn'} />
            </button>
          </>
        )}

        {!successfulResponse && (
          <>
            <h2 className={'auth-login-title'}>
              <FormatMessage id={'ds.auth.verifyEmail.title'} asHtml />
            </h2>
            <Input
              type={'password'}
              placeholder={messages['ds.auth.input.password']}
              autoComplete={'new-password'}
              name={'password-1'}
              id={'password-1'}
              value={password}
              hasError={!!errorMessage}
              passwordMatch={passwordMatch}
              onChange={(e) => onPasswordChange(e)}
            />

            {score > 0 && <PasswordStrengthIndicator strong={score > 2} passwordMatch={passwordMatch} />}

            <Input
              type={'password'}
              placeholder={messages['ds.auth.input.confirmPassword']}
              autoComplete={'new-password'}
              name={'password-2'}
              id={'password-2'}
              hidden={score < 3 && passwordConfirm.length === 0}
              value={passwordConfirm}
              hasError={!!errorMessage}
              errorMessage={errorMessage}
              errorSuggestion={errorSuggestion}
              passwordMatch={passwordMatch}
              onChange={(e) => onPasswordChange(e)}
            />

            {passwordMatch && (
              <div className={'auth-login-text'} onClick={() => setOpenPopup(!openPopup)}>
                <FormatMessage id={'ds.auth.changePassword.byProceeding'} asHtml />
              </div>
            )}

            <button
              className={'auth-login-btn ds-hmi-btn ds-hmi-btn-primary'}
              disabled={score < 3 || !passwordMatch}
              onClick={() => validatePasswordAndRequest()}
            >
              <FormatMessage id={'ds.auth.nextBtn'} />
            </button>
          </>
        )}
        <AgreementsModal language={language} open={openPopup} onClose={() => setOpenPopup(!openPopup)} />
      </div>
    </div>
  );
};

const AuthVerificationEmailContainer: React.FC = () => {
  const [zxcvbnReady, setZxcvbnReady] = useState(false);

  useEffect(() => {
    loadDynamicZxcvbn(() => {
      // zxcvbn ready
      setZxcvbnReady(true);
    });
  }, []);

  if (!zxcvbnReady) return null;

  return <AuthVerifyEmail passwordStrength={zxcvbn} />;
};

export default AuthVerificationEmailContainer;
