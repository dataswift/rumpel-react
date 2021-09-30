import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthApplicationLogo, Input } from 'hmi';
import { HatApplicationContent } from 'hmi/dist/interfaces/hat-application.interface';
import FormatMessage from '../../../features/messages/FormatMessage';

type Props = {
  goToSignup: () => void;
  onNext: (email: string) => void;
  repeat?: string;
  parentApp: HatApplicationContent;
  errorMessage?: string;
  errorSuggestion?: string;
};

const LoginEmail: React.FC<Props> = ({
  parentApp,
  errorMessage,
  errorSuggestion,
  onNext,
  goToSignup,
  repeat,
}) => {
  const [email, setEmail] = useState('');

  return (
    <div className="flex-column-wrapper auth-login">
      <AuthApplicationLogo src={parentApp.info.graphics.logo.normal} alt={parentApp.info.name} />

      <h2 className="auth-login-title">
        <FormatMessage id="hatters.auth.login.title" asHtml />
      </h2>

      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        id="email"
        value={email}
        hasError={!!errorMessage}
        errorMessage={errorMessage}
        errorSuggestion={errorSuggestion}
        autoCapitalize="none"
        onChange={(e) => setEmail(e.target.value)}
        spellCheck="false"
        autoCorrect="off"
      />

      <button
        aria-label="Next Button"
        className="auth-login-btn ds-hmi-btn ds-hmi-btn-primary"
        disabled={email.length < 3}
        onClick={() => onNext(email)}
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

export default LoginEmail;
