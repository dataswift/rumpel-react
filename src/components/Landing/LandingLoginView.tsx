import React, { useState } from "react";
import DataswiftTm from '../../assets/icons/dataswift_tm.svg';
import { Input } from "hmi";
import { pdaLookupWithEmail } from "../../services/HattersService";
import { PdaLookupResponse } from "../../types/Hatters";
import { config } from "../../app.config";
import { useHistory } from "react-router-dom";
import { userAccessToken } from "../../api/hatAPI";
import { loginWithToken } from "../../features/authentication/authenticationSlice";
import { HatClientService } from "../../services/HatClientService";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const LandingLoginView: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
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

      const res = await userAccessToken(response?.hatName, password);

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

  const onSignup = async () => {
    window.location.assign(`${config.links.pdaSignup}&email=${email}`);
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
            onChange={e => {
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

      {currentStep === 2 && (
        <>
          <div className="landing-login-email-text">{email}</div>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="ds-hmi-btn ds-hmi-btn-primary" onClick={onLogin}>
            Login
          </button>
        </>
      )}

      <hr />
      <div className="landing-dont-have-account">Don't have an account?</div>
      <button
        className="ds-hmi-btn ds-hmi-btn-primary landing-btn-secondary"
        onClick={onSignup}>
        Signup
      </button>
    </div>
  );
};

export default LandingLoginView;
