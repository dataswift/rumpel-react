import React, { useEffect, useState } from 'react';
import './AuthLogin.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import * as queryString from "query-string";
import { HatClientService } from "../../services/HatClientService";
import { loginWithToken } from "./authenticationSlice";
import { userAccessToken } from "../../api/hatAPI";
import { Input } from "hmi";
import { getApplicationHmi, selectApplicationsHmi } from "../applications/applicationsSlice";
import { config } from "../../app.config";

type Query = {
    target?: string;
}

type QueryLocationState = {
  repeat?: string;
  email?: string;
  applicationId?: string;
  redirectUri?: string;
}

const AuthLogin: React.FC = () => {
  const parentApp = useSelector(selectApplicationsHmi);
  const [password, setPassword] = useState('');
  const [hatName, setHatName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();
  let location = useLocation<{from?: string, query: QueryLocationState}>();
  const dispatch = useDispatch();
  const { target } = queryString.parse(window.location.search) as Query;
  const targetParam = target || '/feed';

  const { from, query } = location?.state || {};
  const { repeat, email, applicationId, redirectUri } = query || {};

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

        const secure = window.location.protocol === 'https:';

        // TODO ensure that this is fine to do
        Cookies.set('token', res.parsedBody.accessToken, { expires: 3, secure: secure, sameSite: 'strict' });

        loginSuccessful();
      }
    } catch (e) {
      setErrorMessage('Sorry, that password is incorrect!');
    }
  };

  const navigateToSignup = () => {
    if (applicationId && redirectUri) {
      window.location.href = `${ config.links.hatters }/services/signup?` +
          `application_id=${ applicationId }&redirect_uri=${ redirectUri }`;
    } else {
      window.location.href = `${ config.links.hatters }/hat/signup`;
    }
  };

  useEffect(() => {
    if (applicationId && !parentApp) {
      dispatch(getApplicationHmi(applicationId));
    }
  }, [dispatch, parentApp, applicationId]);

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <div className={'auth-login-logo-wrapper'}>
          {parentApp?.info.graphics.logo.normal &&
          <img src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name}/>
          }
        </div>

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
