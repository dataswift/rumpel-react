import React from 'react';
import './HatClaim.scss';
import HatClaimActions from "../HatClaimActions";
import HatClaimEmail from "../HatClaimEmail";

const HatClaim: React.FC = () => {
    return (
        <div className="hat-claim flex-column-wrapper">
            <HatClaimEmail />
            <HatClaimActions />
        </div>
    );
};

export default HatClaim;
