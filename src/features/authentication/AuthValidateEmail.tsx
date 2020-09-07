import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './AuthLogin.scss';
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { AgreementsModal, Input, IssuedBy } from "hmi";
import { PasswordStrengthIndicator } from "../../components/PasswordStrengthMeter/PasswordStrengthIndicator";
import { loadDynamicZxcvbn } from "../../utils/load-dynamic-zxcvbn";
import { useHistory, useParams } from "react-router";

import * as queryString from "query-string";
import { buildClaimRequest, claimHat } from "../hat-claim/hat-claim.service";
import { HatClaim } from "../hat-claim/hat-claim.interface";

type Query = {
    email?: string;
}
const debounce = require('lodash.debounce');

declare const zxcvbn: any;

const AuthValidateEmail: React.FC = () => {
  const history = useHistory();
  const [parentApp, setParentApp] = useState<HatApplicationContent | null>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | undefined>(undefined);
  const [successfulResponse, setSuccessfulResponse] = useState<Date | null>(null);
  let { validateToken } = useParams();
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

  const validateEmailAddress = async () => {
    try {
      const host = window.location.hostname;

      const hatName = host.substring(0, host.indexOf('.'));
      const hatCluster = host.substring(host.indexOf('.') + 1);

      const hatClaim: HatClaim = {
        email: email,
        hatName: hatName,
        hatCluster: hatCluster,
        optins: false,
        password: password,
        termsAgreed: true
      };

      const res = await claimHat(validateToken || '', buildClaimRequest(hatClaim));

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

  const validatePasswordAndRequest = async () => {
    if (password === passwordConfirm) {
        validateEmailAddress();
    }
  };

  const login = async () => {
    if (successfulResponse) {
      // TODO a proper redirect with params to client or dashboard.
      history.replace("/auth/oauth");
    }
  };

  useEffect(() => {
    const { email } = queryString.parse(window.location.search) as Query;
    setEmail(email || "");

    loadDynamicZxcvbn(() => {
      // zxcvbn ready
    });
  }, []);

  useEffect(() => {
    passwordMatchDebounce(password, passwordConfirm, score);
  }, [password, passwordConfirm, score, passwordMatchDebounce]);

  return (
    <div>
      <div className={'flex-column-wrapper auth-login auth-change-password'}>
        <img className={'auth-login-logo'} src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>

        <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>

        {successfulResponse &&
                <>
                  <h2 className={'auth-login-title'}>The password to your Personal Data Account has been created.</h2>

                  <button className={'auth-login-btn ds-hmi-btn'}
                    onClick={() => login()}
                  >
                    Continue
                  </button>
                </>
        }

        {!successfulResponse &&
                <>
                  <h2 className={'auth-login-title'}>Create a password</h2>
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

                  {passwordMatch &&
                    <p className={'auth-login-text'} onClick={() => setOpenPopup(!openPopup)}>
                      By proceeding, you agree to the Personal Data Account <span>Policies</span>
                      &nbsp;and <span>Terms</span> provided by Dataswift.
                    </p>
                  }

                  <button className={'auth-login-btn ds-hmi-btn'}
                    disabled={score < 3 || !passwordMatch}
                    onClick={() => validatePasswordAndRequest()}
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

export default AuthValidateEmail;
