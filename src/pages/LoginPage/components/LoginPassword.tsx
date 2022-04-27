import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthApplicationLogo, Input } from 'hmi';
import { HatApplicationContent } from 'hmi/dist/interfaces/hat-application.interface';
import FormatMessage from '../../../features/messages/FormatMessage';

type Props = {
  goToSignup: () => void;
  onLogin: (password: string) => void;
  email: string;
  repeat?: string;
  parentApp: HatApplicationContent;
  errorMessage?: string;
};

const LoginPassword: React.FC<Props> = ({
  parentApp,
  errorMessage,
  onLogin,
  goToSignup,
  email,
  repeat,
}) => {
  const [password, setPassword] = useState('');

  return (
    <div className="flex-column-wrapper auth-login">
      <AuthApplicationLogo src={parentApp.info.graphics.logo.normal} alt={parentApp.info.name} />

      <h2 className="ds-hmi-email auth-login-email-title">{email}</h2>

      <h2 className="auth-login-title">
        <FormatMessage
          id={repeat ? 'ds.auth.login.title.password.repeat' : 'ds.auth.login.title.password'}
          asHtml
        />
      </h2>

      <Input
        type="password"
        aria-label="password"
        placeholder="Password"
        autoComplete="password"
        id="password"
        value={password}
        hasError={!!errorMessage}
        errorMessage={errorMessage}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        aria-label="Next Button"
        className="auth-login-btn ds-hmi-btn ds-hmi-btn-primary"
        disabled={password.length < 3}
        onClick={() => onLogin(password)}
      >
        <FormatMessage id="ds.auth.nextBtn" />
      </button>

      <Link className="auth-login-btn-link" to="/auth/recover-password">
        <FormatMessage id="ds.auth.login.forgotPassword" />
      </Link>

      <hr />

      <p className="auth-login-have-an-account">
        <FormatMessage
          id={
            repeat
              ? 'ds.auth.login.title.wantToCreateAccount'
              : 'ds.auth.login.title.dontHaveAnAccount'
          }
        />
      </p>

      <button
        className="auth-login-btn-signup ds-hmi-btn ds-hmi-btn-primary"
        onClick={() => goToSignup()}
      >
        <FormatMessage id="ds.auth.signupBtn" />
      </button>
    </div>
  );
};

export default LoginPassword;
