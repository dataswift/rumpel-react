import React, { useState } from 'react';
import DataswiftTm from '../../assets/icons/dataswift_tm.svg';
import { Input } from 'hmi';
import { pdaLookupWithEmail, resendVerificationEmail } from '../../services/HattersService';
import { PdaLookupResponse } from '../../types/Hatters';
import { Link, useHistory } from 'react-router-dom';
import { newUserAccessToken } from '../../api/hatAPI';
import { loginWithToken } from '../../features/authentication/authenticationSlice';
import { HatClientService } from '../../services/HatClientService';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import FormatMessage from "../../features/messages/FormatMessage";
import { APPLICATION_ID } from "../../app.config";
import { environment } from "../../environment";

const LandingLoginView: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [resendEmailState, setResendEmailState] = useState('idle');
  const [response, setResponse] = useState<PdaLookupResponse | null>(null);
  const [password, setPassword] = useState('');

  const onNext = async () => {
    try {
      const res = await pdaLookupWithEmail(email);
      if (res.parsedBody) {
        setCurrentStep(2);
        setResponse(res.parsedBody);
      }
    } catch (e) {
      console.log(e);
      setError('We can’t find an account that matches this information.');
    }
  };

  const onLogin = async () => {
    try {
      if (!response?.hatName) return;

      const res = await newUserAccessToken(response.hatName + '.' + response.hatCluster, response.hatName, password);

      if (res.parsedBody) {
        dispatch(loginWithToken(res.parsedBody.accessToken));
        HatClientService.getInstance(res.parsedBody.accessToken);

        const secure = window.location.protocol === 'https:';

        Cookies.set('token', res.parsedBody.accessToken, { expires: 3, secure: secure, sameSite: 'strict' });

        history.replace('/feed');
      }
    } catch (e) {
      console.log(e);
    }
  };


  const resendEmail = async () => {
    try {
      setResendEmailState('pending');
      const res = await resendVerificationEmail(email, window.location.origin, environment.sandbox);

      if (res.parsedBody) {
        setResendEmailState('success');
      }
    } catch (e) {
      setResendEmailState('error');
    }
  };

  const onSignup = async () => {
    history.push(`/register?email=${email}&application_id=${APPLICATION_ID}&redirect_uri=${window.location.origin}`);
  };

  return (
    <div className="landing-login">
      <img src={DataswiftTm} className="landing-dataswift-tm" alt="Dataswift" />
      <h2>Log in to your account</h2>
      {currentStep === 1 && (
        <>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            hasError={!!error}
            errorMessage={error}
          />

          <button className="ds-hmi-btn ds-hmi-btn-primary" onClick={onNext}>
            Next
          </button>
        </>
      )}

      {currentStep === 2 && response?.verified && (
        <>
          <div className="landing-login-email-text">{email}</div>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="ds-hmi-btn ds-hmi-btn-primary" onClick={onLogin}>
            Login
          </button>

          <Link className={'auth-login-btn-link'} to={'/auth/recover-password'}>
            <FormatMessage id={'ds.auth.login.forgotPassword'} />
          </Link>
        </>
      )}

      {currentStep === 2 && !response?.verified && (
        <>
          <h2 className={'ds-hmi-email signup-email-title'}>{email}</h2>

          <h2 className={'signup-title'}>
            <FormatMessage id="'hatters.auth.confirmYourIdentity.title'" />
          </h2>

          <button className={'signup-btn-secondary'} onClick={() => resendEmail()}>
            <FormatMessage id={'hatters.auth.confirmYourIdentity.resendActivationEmail'} />
            {resendEmailState === 'error' && (
              <i className={'material-icons'} style={{ color: '#e50d42' }}>
                error_outline
              </i>
            )}
            {resendEmailState === 'success' && (
              <i className={'material-icons'} style={{ color: '#a8c62b' }}>
                done
              </i>
            )}
          </button>

          <div className={'signup-help-text'} onClick={() => {}}>
            <FormatMessage id={'hatters.auth.confirmYourIdentity.needHelp'} asHtml />
          </div>
        </>
      )}

      <hr />
      <div className="landing-dont-have-account">Don't have an account?</div>
      <button className="ds-hmi-btn ds-hmi-btn-primary landing-btn-secondary" onClick={onSignup}>
        Signup
      </button>
    </div>
  );
};

export default LandingLoginView;
