import React, { useEffect, useState } from 'react';
import './Login.scss';
import { InfoHeader } from '../../shared/headers/InfoHeader/InfoHeader';
import dataRightsLogo from '../../../assets/images/hat-data-rights.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userAccessToken } from '../../../api/hatAPI';
import { NotificationBanner } from '../../shared/banners/NotificationBanner/NotificationBanner';
import { loginWithToken } from '../../../features/authentication/authenticationSlice';
import { useDispatch } from 'react-redux';
import { useQuery } from '../../../hooks/useQuery';
import { HatClientService } from '../../../services/HatClientService';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [hatName, setHatName] = useState('');
  const [hatDomain, setHatDomain] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  let history = useHistory();
  let location = useLocation();
  const query = useQuery();
  const dispatch = useDispatch();
  // @ts-ignore
  // const target =  query.get("target") || location.state.from || { from: { pathname: "/feed" } };

  let { from } = location.state || { from: { pathname: '/feed' } };

  useEffect(() => {
    const host = window.location.hostname;

    setHatName(host.substring(0, host.indexOf('.')));
    setHatDomain(host.substring(host.indexOf('.')));
  }, []);

  const login = async () => {
    try {
      setErrorMsg('');
      const res = await userAccessToken(hatName, password);
      if (res.parsedBody) {
        dispatch(loginWithToken(res.parsedBody.accessToken));
        HatClientService.getInstance(res.parsedBody.accessToken);

        history.replace(from);
      }
    } catch (e) {
      setErrorMsg('Sorry, that password is incorrect!');
    }
  };

  const navigateToPasswordRecovery = () => {
    window.location.href = window.location.host + '/#/user/password/recovery';
  };

  return (
    <div className={'login flex-column-wrapper'}>
      <InfoHeader />
      {errorMsg && <NotificationBanner type={'error'} message={errorMsg} />}
      <span className={'flex-spacer-small'} />
      <img className={'login-dataswift-logo'} src={'https://cdn.dataswift.io/dataswift/logo/ds-full-dark.svg'} />
      <hr />
      <div className="title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>{hatDomain}</h3>
        </div>
      </div>
        <div className="input-password-container login-password-container">
            <input
                type={hidePassword ? 'password' : 'text'}
                name="password"
                autoComplete={'password'}
                onFocus={() => setErrorMsg('')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setRemember(e.target.checked)}
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
        <button role="button" type="submit" className="btn btn-accent" onClick={() => login()}>
          Log in
        </button>
        <button
          className={'btn btn-transparent-grey'}
          role={'button'}
          type={'button'}
          onClick={() => navigateToPasswordRecovery()}
        >
          Forgotten password?
        </button>
      </div>

      <span className={'flex-spacer-large'} />
    </div>
  );
};

export default Login;
