import React, { useEffect } from 'react';
import './HatClaim.scss';
import HatClaimActions from "../HatClaimActions";
import HatClaimEmail from "../HatClaimEmail";
import HatClaimUrl from "../HatClaimUrl/HatClaimUrl";
import HatClaimPassword from "../HatClaimPassword";
import HatClaimUrlConfirmation from "../HatClaimConfirmation/HatClaimConfirmation";
import { useParams } from "react-router";
import { getParameterByName } from "../../../utils/query-params";
import { isEmail } from "../../../utils/validations";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux/reducer/rootReducer";
import { editHatClaim, setCurrentStep } from "../redux/actions/hatClaimActions";
import { loadDynamicZxcvbn } from "../../../utils/load-dynamic-zxcvbn";

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const HatClaim: React.FC<Props> = props => {
    const optins: string[] = ['MadHATTERS', 'HAT Monthly', 'HCF'];
    const { claimToken } = useParams();


    useEffect(() => {
        const email =  getParameterByName('email');

        if (!!email) {
            props.editHatClaim('email', email);
            loadDynamicZxcvbn(() => {
                console.log('ready')
            });
        }
    }, []);

    const changeStep = (newStep: number) => {
        if (newStep === 1) {
            if (isEmail(props.hatClaim.email)) {
                props.setCurrentStep(newStep);
            }
        } else if (newStep === 3) {
            if (props.password.passwordStrength.score >= 2) {
                props.setCurrentStep(newStep);
            }
        } else {
            props.setCurrentStep(newStep);
        }
    };

    return (
        <div className="hat-claim flex-column-wrapper">
            <span className={'flex-spacer-small'} />
            <HatClaimEmail />
            <HatClaimUrl />
            <HatClaimPassword />
            <HatClaimUrlConfirmation currentStep={props.currentStep} />

            <span className={'flex-spacer-large'} />
            <HatClaimActions currentStep={props.currentStep} setCurrentStep={(newStep) => changeStep(newStep)}/>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    hatClaim: state.hatClaim.hatClaim,
    currentStep: state.hatClaim.currentStep,
    password: state.hatClaim.password,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            editHatClaim,
            setCurrentStep
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HatClaim);