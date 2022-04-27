import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import './LoginPage.scss';
import * as queryString from 'query-string';
import { HatClientService } from '../../services/HatClientService';
import { newUserAccessToken } from '../../api/hatAPI';

import usePdaAuthHmi from '../../hooks/usePdaAuth';
import LoginPassword from './components/LoginPassword';
import { selectMessages } from '../../features/messages/messagesSlice';
import {
  getPdaLookupDetails,
  loginWithToken,
  selectUserPdaLookupDetails,
  selectUserPdaLookupResponseError,
} from '../../features/authentication/authenticationSlice';
import LoginEmail from './components/LoginEmail';
import { isEmail } from '../../utils/validations';
import RegistrationConfirmYourIdentity from '../RegistrationPage/components/RegistrationConfirmYourIdentity';
import { APPLICATION_ID } from '../../app.config';

type Query = {
  target?: string;
};

type QueryLocationState = {
  repeat?: string;
  email?: string;
  applicationId?: string;
  redirectUri?: string;
  lang?: string;
};

const LoginPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = useSelector(selectMessages);
  const pdaDetails = useSelector(selectUserPdaLookupDetails);
  const [email, setEmail] = useState('');
  const pdaLookupResponseError = useSelector(selectUserPdaLookupResponseError);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSuggestion, setErrorSuggestion] = useState('');

  const history = useHistory();
  const location = useLocation<{ from?: string; query: QueryLocationState }>();
  const dispatch = useDispatch();
  const { target } = queryString.parse(window.location.search) as Query;
  const targetParam = target || 'feed';

  const { from, query } = location?.state || {};
  const { repeat, email: emailParam, applicationId, redirectUri, lang } = query || {};

  const { parentApp } = usePdaAuthHmi(applicationId || APPLICATION_ID, lang, true);

  const loginSuccessful = () => {
    // This is a hack and ideally should be removed. This is what allows the log in via dataswift.io webpage,
    // without this check users are redirected back to the dataswift.io page with the token attached. The problem
    // is that the dataswift.io page has no idea what to do with the token and uses are stuck there. With this hack
    // users are being redirected back to their PDA Dashboard which is the intended behaviour.
    const isDataswiftWebsite = from?.search.toString().includes('www.dataswift.io%2Fsign-up-login');
    if (from && !isDataswiftWebsite) {
      history.replace(from);
    } else {
      window.location.href = `${window.location.origin}/${targetParam}`;
    }
  };

  const getPdaDetails = async () => {
    const maybeEmail = emailParam || window.localStorage.getItem('session_email');
    if (!maybeEmail) return;

    setEmail(maybeEmail);
  };

  const onNext = (email: string) => {
    console.log('next');
    if (isEmail(email)) {
      setEmail(email);
      return;
    }

    setErrorMessage(messages['hatters.auth.login.notValidUsername']);
    setErrorSuggestion(messages['hatters.auth.login.notValidUsernameSuggestion']);
  };

  const login = async (password: string) => {
    if (!pdaDetails) return;
    setErrorMessage('');

    try {
      const res = await newUserAccessToken(
        `${pdaDetails.hatName}.${pdaDetails.hatCluster}`,
        pdaDetails.hatName,
        password,
      );

      if (res.parsedBody) {
        dispatch(loginWithToken(res.parsedBody.accessToken));
        HatClientService.getInstance(res.parsedBody.accessToken);

        const secure = window.location.protocol === 'https:';

        // TODO ensure that this is fine to do
        Cookies.set('token', res.parsedBody.accessToken, {
          expires: 3,
          secure,
          sameSite: 'strict',
        });
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
      history.push(
        `/register?application_id=${applicationId}&redirect_uri=${redirectUri}&lang=${lang}`,
      );
    }
  };

  useEffect(() => {
    if (pdaDetails) {
      setStep(1);
    }
  }, [pdaDetails]);

  useEffect(() => {
    if (!isEmail(email)) return;

    dispatch(getPdaLookupDetails(email));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    getPdaDetails();
    const hatSvc = HatClientService.getInstance();
    const sessionEmail = localStorage.getItem('session_email');

    const token = Cookies.get('token');

    if (token && !hatSvc.isTokenExpired(token) && sessionEmail === emailParam) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);

      loginSuccessful();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pdaLookupResponseError) {
      setErrorMessage(messages['hatters.auth.login.notRecognized']);
      setErrorSuggestion('');
    } else {
      setErrorMessage('');
      setErrorSuggestion('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdaLookupResponseError]);

  if (!parentApp) {
    return null;
  }

  if (pdaDetails && !pdaDetails.verified) {
    return (
      <RegistrationConfirmYourIdentity
        email={email}
        redirectUri={redirectUri || window.location.origin}
        parentApp={parentApp}
      />
    );
  }

  return (
    <div>
      {step === 0 && (
        <LoginEmail
          parentApp={parentApp}
          goToSignup={() => navigateToSignup()}
          onNext={onNext}
          errorMessage={errorMessage}
          errorSuggestion={errorSuggestion}
          repeat={repeat}
        />
      )}

      {step === 1 && (
        <LoginPassword
          parentApp={parentApp}
          email={email as string}
          goToSignup={() => navigateToSignup()}
          onLogin={login}
          errorMessage={errorMessage}
          repeat={repeat}
        />
      )}
    </div>
  );
};

export default LoginPage;
