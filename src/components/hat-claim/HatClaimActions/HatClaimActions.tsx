import React from 'react';
import './HatClaimActions.scss';

interface Props {
    currentStep: number
    setCurrentStep: (newStep: number) => void;
}

const HatClaimActions: React.FC<Props> = props => {
    return (
        <div className="hat-claim-actions flex-column-wrapper flex-align-items-center">
            <button
                className={'btn btn-accent'}
                onClick={ () => props.setCurrentStep(props.currentStep + 1)}
            >Next</button>
            {props.currentStep > 0 &&
                <button
                    className={'btn btn-transparent'}
                    onClick={ () => props.setCurrentStep(props.currentStep -1)}
                >Previous</button>
            }
        </div>
    );
};

export default HatClaimActions;
