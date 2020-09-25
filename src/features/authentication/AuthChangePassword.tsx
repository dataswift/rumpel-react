import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './AuthLogin.scss';
import { resetPassword } from "../../api/hatAPI";
import { AgreementsModal, AuthApplicationLogo, Input, IssuedBy } from "hmi";
import { PasswordStrengthIndicator } from "../../components/PasswordStrengthMeter/PasswordStrengthIndicator";
import { loadDynamicZxcvbn } from "../../utils/load-dynamic-zxcvbn";
import { useHistory, useParams } from "react-router";

import * as queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationHmi,
  selectApplicationHmi,
  selectApplicationHmiState,
  setAppsHmiState
} from "../applications/applicationsSlice";

type Query = {
  email?: string;
  application_id?: string;
  lang?: string;
  redirect_uri?: string;
}

const debounce = require('lodash.debounce');

declare const zxcvbn: any;

const AuthChangePassword: React.FC = () => {
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const history = useHistory();
  const [zxcvbnReady, setZxcvbnReady] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState("");
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | undefined>(undefined);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);
  let { resetToken } = useParams();
  const passwordMatchDebounce = useRef(debounce((password: string, passwordConfirm: string, score: number) =>
    validatePasswordMatch(password, passwordConfirm, score), 400)).current;

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

  const resetPasswordRequest = async () => {
    try {
      const res = await resetPassword(resetToken, { newPassword: password });

      if (res) {
        setSuccessfulResponse(new Date());
      }
    } catch (error) {
      setErrorMessage('Oops!');
      setErrorSuggestion("It seems there was a glitch in the matrix. Please try again.");
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

  const login = async () => {
    if (successfulResponse) {
      const { application_id, redirect_uri, email, lang } = queryString.parse(window.location.search) as Query;

      if (redirect_uri && application_id) {
        const path = `/auth/oauth?application_id=${ application_id }`+
            `&redirect_uri=${ redirect_uri }&email=${ email }&lang=${ lang }`;
        history.replace(path);
      } else {
        history.replace("/auth/login");
      }
    }
  };

  useEffect(() => {
    const { email, application_id } = queryString.parse(window.location.search) as Query;
    setEmail(email || "");

    loadDynamicZxcvbn(() => {
      // zxcvbn ready
      setZxcvbnReady(true);
    });

    if (!parentApp && application_id) {
      dispatch(getApplicationHmi(application_id));
    } else {
      dispatch(setAppsHmiState('completed'));
    }
  }, [dispatch, parentApp]);

  useEffect(() => {
    passwordMatchDebounce(password, passwordConfirm, score);
  }, [password, passwordConfirm, score, passwordMatchDebounce]);

  if (!zxcvbnReady) return null;

  return (
    <div>
      <div className={'flex-column-wrapper auth-login auth-change-password'}>
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>

        {successfulResponse &&
            <>
              <h2 className={'auth-login-title'}>The password to your Personal Data Account has been reset.</h2>

              <button className={'auth-login-btn ds-hmi-btn'}
                onClick={() => login()}
              >
                Login
              </button>
            </>
        }

        {!successfulResponse &&
        <>
          <h2 className={'auth-login-title'}>Reset password</h2>
          <Input type={'password'}
            placeholder={'Password'}
            autoComplete={'new-password'}
            name={'password-1'}
            value={password}
            hasError={!!errorMessage}
            passwordMatch={passwordMatch}
            onChange={e => onPasswordChange(e)} />

          {password.length > 0 &&
          <PasswordStrengthIndicator strong={score > 2} passwordMatch={passwordMatch}/>
          }

          {score >= 3 &&
          <Input type={'password'}
            placeholder={'Confirm Password'}
            autoComplete={'new-password'}
            name={'password-2'}
            value={passwordConfirm}
            hasError={!!errorMessage}
            errorMessage={errorMessage}
            errorSuggestion={errorSuggestion}
            passwordMatch={passwordMatch}
            onChange={e => onPasswordChange(e)}
          />
          }

          {passwordMatch &&
          <p className={'auth-login-text'} onClick={() => setOpenPopup(!openPopup)}>
            By proceeding, you agree to the Personal Data Account <span>Policies</span>
            &nbsp;and <span>Terms</span> provided by Dataswift.
          </p>
          }

          <button className={'auth-login-btn ds-hmi-btn'}
            disabled={score < 3 || !passwordMatch}
            onClick={() => validateAndReset()}
          >
            Next
          </button>
        </>
        }


        <IssuedBy />
        <AgreementsModal language={'en'} open={openPopup} onClose={() => setOpenPopup(!openPopup)}/>
      </div>
    </div>
  );
};

export default AuthChangePassword;
