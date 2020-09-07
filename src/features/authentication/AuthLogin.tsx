import React, { useEffect, useState } from 'react';
import './AuthLogin.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import * as queryString from "query-string";
import { HatClientService } from "../../services/HatClientService";
import { loginWithToken } from "./authenticationSlice";
import { userAccessToken } from "../../api/hatAPI";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { Input } from "hmi";

type Query = {
    target?: string;
}

const AuthLogin: React.FC = () => {
  const [parentApp, setParentApp] = useState<HatApplicationContent | null>(null);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [hatName, setHatName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { target } = queryString.parse(window.location.search) as Query;
  const targetParam = target || '/feed';
  // @ts-ignore
  const { from, repeat, email } = location.state;

  const loginSuccessful = () => {
    if (from) {
      history.replace(from);
    } else {
      window.location.href = window.location.origin + '/#' + targetParam;
    }
  };

  useEffect(() => {
    const host = window.location.hostname;
    const hatSvc = HatClientService.getInstance();

    setHatName(host.substring(0, host.indexOf('.')));

    const token = Cookies.get('token');

    if (token && !hatSvc.isTokenExpired(token)) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);

      loginSuccessful();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    setErrorMessage('');

    try {
      const res = await userAccessToken(hatName, password);

      if (res.parsedBody) {
        dispatch(loginWithToken(res.parsedBody.accessToken));
        HatClientService.getInstance(res.parsedBody.accessToken);

        if (remember) {
          const secure = window.location.protocol === 'https:';
          Cookies.set('token', res.parsedBody.accessToken, { expires: 3, secure: secure, sameSite: 'strict' });
        }

        loginSuccessful();
      }
    } catch (e) {
      setErrorMessage('Sorry, that password is incorrect!');
    }
  };

  const navigateToSignup = () => {
    window.location.href = `https://hatters.dataswift.io/services/signup?application_id=`;
  };

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <img className={'auth-login-logo'} src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>

        <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>

        <h2 className={'auth-login-title'}>
          {repeat ? "It looks like you already have an account." : "Enter your password"}
        </h2>

        <Input type={'password'}
          placeholder={'Password'}
          autoComplete={'password'}
          value={password}
          hasError={!!errorMessage}
          errorMessage={errorMessage}
          onChange={e => setPassword(e.target.value)} />

        <button className={'auth-login-btn ds-hmi-btn'}
          disabled={password.length < 3}
          onClick={() => login()}
        >
            Next
        </button>

        <Link className={'auth-login-btn-link'} to={'/auth/recover-password'}>
          Forgot password?
        </Link>

        <hr />

        <p className={'auth-login-have-an-account'}>
          {repeat ? "Want to create a new account?" : "Don't have an account?"}
        </p>

        <button className={'auth-login-btn-signup ds-hmi-btn'} onClick={() => navigateToSignup()}>
          Sign up
        </button>

        <div className={'ds-hmi-footer'}>
          <p>Issued by:</p>
          <img
            src={'https://cdn.dataswift.io/dataswift/logo/ds-full-dark.svg'}
            alt={'Dataswift'}
          />
          <p>
              Dataswift provides Personal Data Accounts that make it possible
              for you to own and securely control your personal data in the
              cloud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
