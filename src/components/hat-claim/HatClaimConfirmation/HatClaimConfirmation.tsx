import React from 'react';
import { hatClaimMessages } from '../messages-hat-claim';

interface Props {
  currentStep: number;
}

const HatClaimUrlConfirmation: React.FC<Props> = props => {
  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <div className="hat-claim-url flex-column-wrapper flex-content-center flex-align-items-center">
      <h2>{hatClaimMessages.yourHatMicroserver}</h2>
      <div className={'text-medium'}>{hatClaimMessages.claiming100mbStorage}</div>
    </div>
  );
};

export default HatClaimUrlConfirmation;
