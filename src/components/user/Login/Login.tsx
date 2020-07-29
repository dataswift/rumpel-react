import React, { useEffect, useState } from 'react';
import './Login.scss';
import dataRightsLogo from '../../../assets/images/hat-data-rights.png';
import { useHistory, useLocation } from 'react-router-dom';
import { userAccessToken } from '../../../api/hatAPI';
import { loginWithToken } from '../../../features/authentication/authenticationSlice';
import { useDispatch } from 'react-redux';
import { HatClientService } from '../../../services/HatClientService';
import Cookies from 'js-cookie';
import { InfoHeader } from "../../headers/InfoHeader/InfoHeader";
import { NotificationBanner } from "../../banners/NotificationBanner/NotificationBanner";
import * as queryString from "query-string";

type Query = {
  target?: string;
}

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [hatName, setHatName] = useState('');
  const [hatDomain, setHatDomain] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { target } = queryString.parse(window.location.search) as Query;
  const targetParam = target;
  // @ts-ignore
  const from = location.state?.from || '/feed';

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
    setHatDomain(host.substring(host.indexOf('.')));

    const token = Cookies.get('token');

    if (token && !hatSvc.isTokenExpired(token)) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);

      loginSuccessful();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    setErrorMsg('');

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
      setErrorMsg('Sorry, that password is incorrect!');
    }
  };

  const navigateToPasswordRecovery = () => {
    history.push('/user/password/recover');
  };

  return (
    <div className={'login flex-column-wrapper'}>
      <InfoHeader />
      <NotificationBanner type={'error'} display={!!errorMsg}>{errorMsg}</NotificationBanner>
      <span className={'flex-spacer-small'} />
      <img
        className={'login-dataswift-logo'}
        src={'https://cdn.dataswift.io/dataswift/logo/ds-full-dark.svg'}
        alt={'Dataswift logo'}
      />
      <hr />
      <div className="title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>{hatDomain}</h3>
        </div>
      </div>

      <form onSubmit={e => {
        e.preventDefault();
        login();
      }}
      className={'flex-column-wrapper'}
      >
        <div className="input-password-container login-password-container">
          <input
            type={hidePassword ? 'password' : 'text'}
            name="password"
            autoComplete={'password'}
            onFocus={() => setErrorMsg('')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="button" tabIndex={-1} onClick={() => setHidePassword(!hidePassword)}>
            <i className={'material-icons'}>{hidePassword ? ' visibility_off' : ' visibility'}</i>
          </button>
        </div>

        <div className={'checkbox-container login-remember-me-container'}>
          <label htmlFor={'rememberMe'}>
          Remember me
            <input
              id={'rememberMe'}
              name={'rememberMe'}
              type={'checkbox'}
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <span className="checkbox-checkmark" />
          </label>
        </div>

        <span className={'flex-spacer-small'} />

        <div className="logo-wrapper">
          <img src={dataRightsLogo} height="48" width="48" alt="HAT Data rights logo" />
        </div>

        <div className="data-rights-description">
        Data rights protection ensures your HAT is always secure and that the rights to your data are preserved. Your
        password will not be shared with the application.
        </div>

        <div className="user-actions">
          <button type="submit" className="btn btn-accent" onClick={() => login()}>
          Log in
          </button>
          <button
            className={'btn btn-transparent-grey'}
            type={'button'}
            onClick={() => navigateToPasswordRecovery()}
          >
          Forgotten password?
          </button>
        </div>
      </form>

      <span className={'flex-spacer-large'} />
    </div>
  );
};

export default Login;
