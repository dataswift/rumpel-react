import React from "react";
import { RegistrationRedirectError } from "../../../types/Hatters";
import FormatMessage from "../../../features/messages/FormatMessage";

type Props = {
  step: number,
  onGoBack: () => void;
  setSignupError: (error: RegistrationRedirectError) => void;
}

const RegistrationBackButton: React.FC<Props> = ({ step, onGoBack, setSignupError }) => {
  // const onClickEvent = useContext(AnalyticsContext)?.onClickEvent;

  const onBackClick = () => {
    /* Clicking on the back button at step 0 works as a cancel button
       and triggers a redirection back to the client's app. */
    if (step === 0) {
      // onClickEvent?.(AnalyticsClickEvents.backToDeveloperSiteButton);
      setSignupError({
        error: 'user_cancelled',
        reason: 'permissions_denied',
      });
    }

    if (step > 0) {
      // onClickEvent?.(AnalyticsClickEvents.backToPreviousStepButton);
      onGoBack();
    }
  };

  // An array of steps that don't want to display the back button.
  if ([2].indexOf(step) !== -1) return null;

  return (
    <div className={'signup-back-button-container'}>
      <button onClick={() => onBackClick()}>
        <i className={'material-icons'}>navigate_before</i>
        <FormatMessage id={'hatters.auth.backBtn'} />
      </button>
    </div>
  );
};

export default RegistrationBackButton;
