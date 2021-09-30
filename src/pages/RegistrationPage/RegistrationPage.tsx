import React, { useContext, useEffect, useState } from 'react';
import { parse } from "query-string";
import './RegistrationPage.scss';
import { queryParamsToSignupModel, redirectWithErrorParams, validatePdaSignupQueryParams } from "./helper";
import { PdaSignup, RegistrationRedirectError } from "../../types/Hatters";
import usePdaAuthHmi from "../../hooks/usePdaAuth";
import RegistrationEmail from "./components/RegistrationEmail";
import { AnalyticsContext, Hmi } from "hmi";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../features/language/languageSlice";
import { createPdaAuthUser } from "../../services/HattersService";
import { getMobileOperatingSystem } from "../../utils/utils";
import RegistrationCreatingPDA from "./components/RegistrationCreatingPDA";
import RegistrationConfirmYourIdentity from "./components/RegistrationConfirmYourIdentity";
import { signupTranslateErrorCode } from "../../utils/HattersErrorHandling";
import RegistrationBackButton from "./components/RegistrationBackButton";
import { updateError } from "../../redux/pdaAuth/hmiPdaAuthSlice";
import { AnalyticsClickEvents } from "../../utils/AnalyticsEvents";
import { APPLICATION_ID } from "../../app.config";

export type PdaSignupQuery = {
  application_id: string;
  redirect_uri: string;
  email: string;
  lang: string;
  tags?: string;
  skipDeps?: string;
}

const RegistrationPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;
  const [signup, setSignup] = useState<PdaSignup>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [nextStep, setNextStep] = useState<string | undefined>('');
  const query = parse(location.search) as PdaSignupQuery;
  const language = useSelector(selectLanguage);
  const {
    parentApp,
    dependencyApps,
    dependencyTools,
    hmiSetupError
  } = usePdaAuthHmi(signup?.applicationId || APPLICATION_ID, query.lang);

  const setSignupEmail = (email: string, newsletterOptin: boolean) => {
    const updatedSignup = JSON.parse(JSON.stringify(signup));
    updatedSignup.email = email;
    updatedSignup.newsletterOptin = newsletterOptin;
    setSignup(updatedSignup);
    setStep(1);
  };

  const setUserNotVerified = (email: string, nextStep: string) => {
    setNextStep(nextStep);
    setStep(3);
  };

  const sendPdaAuthSignup = async (signupPayload: PdaSignup, lang?: string | null, skipDeps?: string | null) => {
    const signupStartTime = performance.now();
    signupPayload.platform = getMobileOperatingSystem();

    try {
      const res = await createPdaAuthUser(signupPayload, lang, skipDeps);
      if (res.parsedBody) {
        const analyticsEvent = Object.assign({}, AnalyticsClickEvents.registrationTimePerformance);

        analyticsEvent.value = Math.round(performance.now() - signupStartTime);
        onClickEvent?.(analyticsEvent);

        setSignupDone(true);
        setNextStep(res.parsedBody.nextStep);
      }
    } catch (error) {
      const signupEndTime = performance.now();
      const analyticsEvent = Object.assign({}, AnalyticsClickEvents.registrationErrorTimePerformance);

      analyticsEvent.value = Math.round(signupEndTime - signupStartTime);
      onClickEvent?.(analyticsEvent);
      const translatedError = signupTranslateErrorCode(error?.value || 0);
      setSignupError(translatedError);
    }
  };

  const setSignupError = (error: RegistrationRedirectError) => {
    if (!error.error) return;

    redirectWithErrorParams(query.redirect_uri, error);
  };

  useEffect(() => {
    const maybeQueryParamError = validatePdaSignupQueryParams(query);

    console.log(maybeQueryParamError);
    if (!maybeQueryParamError) {
      setSignup(queryParamsToSignupModel(query));
      return;
    }

    if (maybeQueryParamError === 'redirect_uri_is_required') {
      return;
    }

    dispatch(updateError({
      error: 'application_misconfigured',
      reason: maybeQueryParamError
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (step === 2 && !isSubmitting) {
      sendPdaAuthSignup(Object.assign({}, signup), query.lang, query.skipDeps);
      setIsSubmitting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (!hmiSetupError) return;

    setSignupError(hmiSetupError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hmiSetupError]);

  if (!query.redirect_uri) return (
    <div>
      redirect_uri query parameter is required.
    </div>
  );

  if (!parentApp) return null;

  const isHatApp = ['hatapp', 'hatappstaging'].includes(parentApp.id);

  return (
    <div>
      <RegistrationBackButton step={step} onGoBack={() => setStep(step - 1)} setSignupError={setSignupError} />
      {step === 0 && (
        <RegistrationEmail
          parentApp={parentApp}
          setSignupEmail={setSignupEmail}
          setUserNotVerified={setUserNotVerified}
        />
      )}

      {step === 1 && (
        <Hmi
          email={signup?.email as string}
          parentApp={parentApp}
          onApproved={() => setStep(2)}
          onRejected={() => {
            setSignupError({
              error: 'user_cancelled',
              reason: 'permissions_denied',
            });
          }}
          language={language}
          dependencyTools={dependencyTools.map(tool => tool.info.name)}
          dependencyApps={dependencyApps}
          applicationId={signup?.applicationId as string}
        />
      )}

      {step === 2 && (
        <RegistrationCreatingPDA
          done={signupDone}
          nextStep={nextStep}
          email={signup?.email as string}
          isHatApp={isHatApp}
          parentApp={parentApp}
          redirectUri={query.redirect_uri}
        />
      )}
      {step === 3 && (
        <RegistrationConfirmYourIdentity
          email={signup?.email as string}
          parentApp={parentApp}
          redirectUri={query.redirect_uri}
        />
      )}
    </div>
  );
};

export default RegistrationPage;
