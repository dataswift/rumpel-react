import React, { useEffect, useState } from 'react';
import './AuthLogin.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import * as queryString from 'query-string';
import { HatClientService } from '../../services/HatClientService';
import { loginWithToken } from './authenticationSlice';
import { newUserAccessToken } from '../../api/hatAPI';
import { AuthApplicationLogo, Input } from 'hmi';
import {
  getApplicationHmi,
  selectApplicationHmi,
  selectApplicationHmiState,
  setAppsHmiState,
} from '../applications/applicationsSlice';
import { config } from '../../app.config';
import FormatMessage from '../messages/FormatMessage';
import { selectMessages } from '../messages/messagesSlice';
import { pdaLookupWithEmail } from "../../services/HattersService";
import { PdaLookupResponse } from "../../types/Hatters";

type Query = {
  target?: string;
};

type QueryLocationState = {
  repeat?: string;
  email?: string;
  applicationId?: string;
  redirectUri?: string;
};

const AuthLogin: React.FC = () => {
  const parentApp = useSelector(selectApplicationHmi);
  const parentAppState = useSelector(selectApplicationHmiState);
  const messages = useSelector(selectMessages);
  const [lookupResponse, setLookupResponse] = useState<PdaLookupResponse | null>(null);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();
  let location = useLocation<{ from?: string; query: QueryLocationState }>();
  const dispatch = useDispatch();
  const { target } = queryString.parse(window.location.search) as Query;
  const targetParam = target || '/feed';

  const { from, query } = location?.state || {};
  const { repeat, email, applicationId, redirectUri } = query || {};

  const loginSuccessful = () => {
    // This is a hack and ideally should be removed. This is what allows the log in via dataswift.io webpage,
    // without this check users are redirected back to the dataswift.io page with the token attached. The problem
    // is that the dataswift.io page has no idea what to do with the token and uses are stuck there. With this hack
    // users are being redirected back to their PDA Dashboard which is the intended behaviour.
    const isDataswiftWebsite = from?.search.toString().includes('www.dataswift.io%2Fsign-up-login');
    if (from && !isDataswiftWebsite) {
      history.replace(from);
    } else {
      window.location.href = window.location.origin + '/#' + targetParam;
    }
  };

  const getPdaDetails = async () => {
    try {
      if (!email) return;

      const res = await pdaLookupWithEmail(email);

      if (res.parsedBody) {
        setLookupResponse(res.parsedBody);
      }
    } catch (e) {
      setErrorMessage(messages['ds.auth.error.oops']);
    }
  };

  useEffect(() => {
    getPdaDetails();
    const hatSvc = HatClientService.getInstance();
    const token = Cookies.get('token');

    if (token && !hatSvc.isTokenExpired(token)) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);

      loginSuccessful();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    if (!lookupResponse) return;
    setErrorMessage('');

    try {
      const res = await newUserAccessToken(
        lookupResponse?.hatName + '.' + lookupResponse?.hatCluster,
        lookupResponse?.hatName,
        password
      );

      if (res.parsedBody) {
        dispatch(loginWithToken(res.parsedBody.accessToken));
        HatClientService.getInstance(res.parsedBody.accessToken);

        const secure = window.location.protocol === 'https:';

        // TODO ensure that this is fine to do
        Cookies.set('token', res.parsedBody.accessToken, { expires: 3, secure: secure, sameSite: 'strict' });
        localStorage.setItem('session_email', email || '');

        loginSuccessful();
      }
    } catch (e) {
      if (messages) {
        setErrorMessage(messages['ds.auth.login.passwordIncorrect']);
      }
    }
  };

  const navigateToSignup = () => {
    if (applicationId && redirectUri) {
      // eslint-disable-next-line max-len
      window.location.href = `${config.links.hattersFrontend}/services/signup?application_id=${applicationId}&redirect_uri=${redirectUri}`;
    } else {
      window.location.href = `${config.links.hattersFrontend}/hat/signup`;
    }
  };

  useEffect(() => {
    if (applicationId && !parentApp) {
      dispatch(getApplicationHmi(applicationId));
    } else {
      dispatch(setAppsHmiState('completed'));
    }
  }, [dispatch, parentApp, applicationId]);

  if (!lookupResponse) {
    return null;
  }

  return (
    <div>
      <div className={'flex-column-wrapper auth-login'}>
        <AuthApplicationLogo
          src={parentApp?.info.graphics.logo.normal}
          alt={parentApp?.info.name}
          state={parentAppState}
        />

        <h2 className={'ds-hmi-email auth-login-email-title'}>{email}</h2>

        <h2 className={'auth-login-title'}>
          <FormatMessage id={repeat ? 'ds.auth.login.title.password.repeat' : 'ds.auth.login.title.password'} asHtml />
        </h2>

        <Input
          type={'password'}
          aria-label="password"
          placeholder={'Password'}
          autoComplete={'password'}
          id={'password'}
          value={password}
          hasError={!!errorMessage}
          errorMessage={errorMessage}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          aria-label="Next Button"
          className={'auth-login-btn ds-hmi-btn ds-hmi-btn-primary'}
          disabled={password.length < 3}
          onClick={() => login()}
        >
          <FormatMessage id={'ds.auth.nextBtn'} />
        </button>

        <Link className={'auth-login-btn-link'} to={'/auth/recover-password'}>
          <FormatMessage id={'ds.auth.login.forgotPassword'} />
        </Link>

        <hr />

        <p className={'auth-login-have-an-account'}>
          <FormatMessage
            id={repeat ? 'ds.auth.login.title.wantToCreateAccount' : 'ds.auth.login.title.dontHaveAnAccount'}
          />
        </p>

        <button className={'auth-login-btn-signup ds-hmi-btn ds-hmi-btn-primary'} onClick={() => navigateToSignup()}>
          <FormatMessage id={'ds.auth.signupBtn'} />
        </button>
      </div>
    </div>
  );
};

export default AuthLogin;
