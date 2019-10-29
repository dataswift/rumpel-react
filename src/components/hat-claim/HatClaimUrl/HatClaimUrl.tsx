import React from 'react';
import './HatClaimUrl.scss';
import { hatClaimMessages } from "../messages-hat-claim";

interface Props {
    currentStep: number;
}

const HatClaimUrl: React.FC<Props> = props => {
    if (props.currentStep !== 1) {
        return null;
    }

    return (
        <div className="hat-claim-url flex-column-wrapper flex-content-center flex-align-items-center">
            <h2>{hatClaimMessages.yourHatUrl}</h2>
            <h3>testing.hubat.net</h3>
            <div className={'text-medium'}>{hatClaimMessages.hatUrlDescription}</div>
        </div>
    );
};

export default HatClaimUrl;
