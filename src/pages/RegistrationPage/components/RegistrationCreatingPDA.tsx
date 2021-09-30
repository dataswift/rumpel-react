import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnalyticsContext, AuthApplicationLogo } from "hmi";
import RegistrationAccountCreated from "./RegistrationAccountCreated";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import FormatMessage from "../../../features/messages/FormatMessage";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { AnalyticsClickEvents } from "../../../utils/AnalyticsEvents";

type Props = {
  done: boolean;
  email: string;
  isHatApp: boolean;
  nextStep?: string;
  redirectUri: string;
  parentApp: HatApplicationContent;
};

let percent = 0;
let ms = 10;
let maxProgress = 60;
const WAITING_TIME_UNTIL_CONTINUE_BTN = 2000; // in ms

const RegistrationCreatingPDA: React.FC<Props> = ({ parentApp, redirectUri, done, nextStep, isHatApp, email }) => {
  const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('hatters.signup.creatingPersonalDataServer');
  const [displayContinueBtn, setDisplayContinueBtn] = useState<boolean>(false);
  const [progressComplete, setProgressComplete] = useState(false);

  const redirectToNextStep = useCallback(
    () => {
      if (!nextStep) return;

      window.location.assign(nextStep);
    },
    [nextStep]
  );

  const registrationDone = useCallback(
    () => {
      redirectToNextStep();

      setTimeout(() => {
        setDisplayContinueBtn(true);
      }, WAITING_TIME_UNTIL_CONTINUE_BTN);
    },
    [redirectToNextStep]
  );

  const continueToNextStepClick = () => {
    onClickEvent?.(AnalyticsClickEvents.continueToApplicationButton);
    redirectToNextStep();
  };

  useEffect(() => {
    if (done) maxProgress = 100;
  }, [done]);

  useEffect(() => {
    if (!progressComplete || isHatApp) return;

    registrationDone();
  }, [progressComplete, registrationDone, isHatApp]);

  useEffect(() => {
    if (progress < 60) {
      setProgressText('hatters.signup.creatingPersonalDataServer');
    } else if (progress < 81) {
      setProgressText('hatters.signup.customizingDatabase');
    } else {
      setProgressText('hatters.signup.personalUrlAssigned');
    }

    if (Math.round(percent) === 100) {
      setProgressComplete(true);
    }
  }, [progress, dispatch]);

  useEffect(() => {
    const progressInterval = () => {
      const interval = setInterval(() => {
        if (percent < maxProgress) {
          percent += 1;
          setProgress(percent);
        }

        if (Math.round(percent) === 100) clearInterval(interval);
      }, ms);
    };

    progressInterval();
  }, []);

  if (progressComplete && isHatApp) {
    return <RegistrationAccountCreated parentApp={parentApp} redirectUri={redirectUri} email={email} />;
  }

  return (
    <>
      <div className={'flex-column-wrapper signup'}>
        <AuthApplicationLogo src={parentApp?.info.graphics.logo.normal} alt={parentApp?.info.name} />

        <h2 className={'signup-title'}>
          <FormatMessage id={'hatters.auth.signup.creatingPda'} asHtml />
        </h2>

        <ProgressBar progress={progress} />

        <div className={'signup-progress-text'}>
          <FormatMessage id={progressText} />
        </div>

        <div className={'signup-keep-this-window-open'}>
          <FormatMessage
            id={
              progressComplete
                ? 'hatters.auth.signup.successYourBrowserWillRefresh'
                : 'hatters.auth.signup.keepThisWindowOpen'
            }
            asHtml
          />
        </div>

        <div className={'signup-check-your-email'}>
          <FormatMessage
            id={
              displayContinueBtn
                ? 'hatters.auth.signup.ifBrowserDoesNotRefresh'
                : 'hatters.auth.signup.checkYourEmail'
            }
          />
        </div>

        {displayContinueBtn && (
          <button
            className={'signup-btn ds-hmi-btn ds-hmi-btn-primary'}
            onClick={continueToNextStepClick}
          >
            <FormatMessage id={'hatters.auth.continueBtn'} />
          </button>
        )}
      </div>
    </>
  );
};

export default RegistrationCreatingPDA;
