import React from 'react';
import './HatClaimActions.scss';

const HatClaimActions: React.FC = () => {
    return (
        <div className="hat-claim-actions flex-column-wrapper flex-align-items-center">
            <button className={'btn btn-accent'}>Next</button>
            <button className={'btn btn-transparent'}>Previous</button>
        </div>
    );
};

export default HatClaimActions;
