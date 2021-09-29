import React, { useContext, useEffect, useState } from "react";
import { AgreementsModal, AnalyticsContext, AuthApplicationLogo, Input } from "hmi";
import { parse } from "query-string";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import FormatMessage from "../../../features/messages/FormatMessage";
import { selectLanguage } from "../../../features/language/languageSlice";
import { selectMessages } from "../../../features/messages/messagesSlice";
import { pdaLookupWithEmail } from "../../../services/HattersService";
import { isEmail } from "../../../utils/validations";
import { buildRequestURL, getParameterByName } from "../../../utils/utils";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { AnalyticsClickEvents } from "../../../utils/AnalyticsEvents";

type Props = {
  parentApp: HatApplicationContent;
  setSignupEmail: (email: string, newsletterOptin: boolean) => void;
  setUserNotVerified: (email: string, nextStep: string) => void;
};

type Query = {
  redirect_uri?: string;
  lang?: string;
  application_id?: string;
  email: string;
}

const RegistrationEmail: React.FC<Props> = ({ parentApp, setUserNotVerified, setSignupEmail }) => {
  const location = useLocation();
  const {
    redirect_uri: redirectUri,
    application_id: applicationId,
    lang,
  } = parse(location.search) as Query;
  const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;
  const language = useSelector(selectLanguage);
  const messages = useSelector(selectMessages);
  const [email, setEmail] = useState('');
  const [predefinedEmailAddress, setPredefinedEmailAddress] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsletterOptin, setNewsletterOptin] = useState(false);

  const lookUpEmail = async () => {
    try {
      const res = await pdaLookupWithEmail(email);

      if (res.parsedBody) {
        const { hatCluster, hatName, verified } = res.parsedBody;

        if (hatName && hatCluster) {
          const nextStepLink = buildURLQueryParams(`${window.location.origin}/auth/oauth`);

          if (verified) {
            window.location.assign(nextStepLink);
          } else {
            setSignupEmail(email, newsletterOptin);
            setUserNotVerified(email, nextStepLink);
          }
        }
      }
    } catch (error) {
      if (error?.value && error.value === 16) {
        setSignupEmail(email, newsletterOptin);
      } else {
        if (messages) {
          setErrorMessage(messages['hatters.auth.signup.unexpectedError']);
        }
      }
    }
  };

  const buildURLQueryParams = (url: string) => {
    let params: { [key: string]: string } = {};

    params['repeat'] = 'true';
    params['lang'] = lang || 'en';

    if (email) {
      params['email'] = email;
    }

    if (applicationId) {
      params['application_id'] = applicationId;
    }

    if (redirectUri) {
      params['redirect_uri'] = redirectUri;
    }

    return buildRequestURL(url, params);
  };

  useEffect(() => {
    setErrorMessage('');
    setIsValid(isEmail(email));
  }, [email]);

  useEffect(() => {
    const emailParam = getParameterByName('email');

    if (emailParam && isEmail(emailParam)) {
      setEmail(emailParam);
      setPredefinedEmailAddress(true);
    }
  }, []);

  const onClickNext = () => {
    // Track if user clicks to go to the next stage of PDA setup.
    onClickEvent?.(AnalyticsClickEvents.signupNextButton);

    // Track if user optin-in to receiving data news.
    if (newsletterOptin) {
      onClickEvent?.(AnalyticsClickEvents.newsletterOptin);
    }

    if (isEmail(email)) {
      lookUpEmail();
    }
  };

  if (!parentApp) return null;

  return (
    <>
      <div className={'flex-column-wrapper signup'}>
        <AuthApplicationLogo src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name} />
        <h2 className={'signup-title'}>
          <FormatMessage id={'hatters.auth.signup.title'} asHtml />
        </h2>

        {predefinedEmailAddress ? (
          <h2 className={'signup-title'}>
            {email}
          </h2>
        ) : (
          <Input
            type={'email'}
            placeholder={'Email'}
            id={'email'}
            autoComplete={'email'}
            value={email}
            hasError={!!errorMessage}
            errorMessage={errorMessage}
            autoCapitalize={'none'}
            onChange={e => setEmail(e.target.value)}
            spellCheck='false'
            autoCorrect='off'
          />
        )}

        <div className={'signup-text'} onClick={() => setOpenPopup(!openPopup)}>
          <FormatMessage id={'hatters.auth.signup.byProceeding'} asHtml />
        </div>

        <div className={'ds-checkbox-container'}>
          <label htmlFor={'dsNewsletter'}>
            <div>
              <FormatMessage id={'hatters.auth.signup.stayUpToDate'} />
            </div>
            <input
              id={'dsNewsletter'}
              name={'dsNewsletter'}
              type={'checkbox'}
              checked={newsletterOptin}
              onChange={e => setNewsletterOptin(e.target.checked)}
            />
            <span className="ds-checkbox-checkmark" />
          </label>
        </div>

        <button
          className={'signup-btn ds-hmi-btn ds-hmi-btn-primary'}
          disabled={!isValid || !!errorMessage}
          onClick={() => onClickNext()}
        >
          <FormatMessage id={'hatters.auth.nextBtn'} />
        </button>
      </div>
      <AgreementsModal language={language} open={openPopup} onClose={() => setOpenPopup(!openPopup)} />
    </>
  );
};

export default RegistrationEmail;
