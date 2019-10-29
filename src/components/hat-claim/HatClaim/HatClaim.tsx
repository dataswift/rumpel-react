import React, { useState } from 'react';
import './HatClaim.scss';
import HatClaimActions from "../HatClaimActions";
import HatClaimEmail from "../HatClaimEmail";
import { HatClaimRequest } from "../hat-claim.interface";
import HatClaimUrl from "../HatClaimUrl/HatClaimUrl";
import HatClaimPassword from "../HatClaimPassword";

const HatClaim: React.FC = () => {
    const initHatClaim: HatClaimRequest = {
        password: '',
        email: '',
        hatName: '',
        hatCluster: '',
        termsAgreed: false,
        optins: false,
    };
    const [currentStep, setCurrentStep] = useState(0);
    const [hatClaim, setHatClaim] = useState<HatClaimRequest>(initHatClaim);

    return (
        <div className="hat-claim flex-column-wrapper">
            <HatClaimEmail currentStep={currentStep}/>
            <HatClaimUrl currentStep={currentStep} />
            <HatClaimPassword currentStep={currentStep} />

            <HatClaimActions currentStep={currentStep} setCurrentStep={(newStep) => setCurrentStep(newStep)}/>
        </div>
    );
};

export default HatClaim;
