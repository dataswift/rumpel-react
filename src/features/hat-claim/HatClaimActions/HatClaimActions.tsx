import React from 'react';
import './HatClaimActions.scss';

interface Props {
  currentStep: number;
  setCurrentStep: (newStep: number) => void;
}

const HatClaimActions: React.FC<Props> = props => {
  return (
    <div className="hat-claim-actions flex-column-wrapper flex-align-items-center">
      <button className={'btn btn-accent'} onClick={() => props.setCurrentStep(props.currentStep + 1)}>
        {props.currentStep === 3 ? 'Confirm' : props.currentStep === 5 ? 'login' : 'Next'}
      </button>
      {props.currentStep !== 0 && props.currentStep !== 3 && props.currentStep !== 5 && (
        <button className={'btn btn-transparent'} onClick={() => props.setCurrentStep(props.currentStep - 1)}>
          Previous
        </button>
      )}

      {props.currentStep === 3 && (
        <div className="text-small" style={{ textAlign: 'center', marginTop: '1.8rem' }}>
          By selecting 'Confirm', I agree to the Dataswift&nbsp;
          <a
            href="https://www.dataswift.io/legal/dataswift-personal-data-account-owner-agreement"
            rel="noopener noreferrer"
            target="_blank"
          >
            Personal Data Account (PDA) Owner Agreement
          </a>
          &nbsp; and{' '}
          <a
            href="https://www.dataswift.io/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </div>
      )}
    </div>
  );
};

export default HatClaimActions;
