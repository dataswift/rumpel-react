import React from 'react';
import './HatClaimActions.scss';

interface Props {
  currentStep: number;
  setCurrentStep: (newStep: number) => void;
}

const HatClaimActions: React.FC<Props> = (props) => {
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
            href="https://cdn.dataswift.io/legal/hat-owner-terms-of-service.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Terms of Service
          </a>
          &nbsp; and{' '}
          <a
            href="https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf"
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
