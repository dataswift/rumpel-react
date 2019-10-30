import React, { useState } from 'react';
import './HatClaimPassword.scss';
import { hatClaimMessages } from "../messages-hat-claim";
import { PasswordStrengthMeter } from "../../shared/PasswordStrengthMeter";
import { AppState } from "../../../redux/reducer/rootReducer";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { editHatClaim, editHatClaimPassword } from "../redux/actions/hatClaimActions";
import { connect } from "react-redux";
const debounce = require("lodash.debounce");
declare const zxcvbn: any;

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const HatClaimPassword: React.FC<Props> = props => {
    const [hide1, setHide1] = useState(true);
    const [hide2, setHide2] = useState(true);

    const validatePasswordDebounce = debounce(
        (p: string) => validatePassword(p),
        400
    );


    // const passwordMatchDebounce = debounce(
    //     (passwordConfirm: string) => this.checkIfPasswordsMatch(passwordConfirm),
    //     300
    // );

    function validatePassword(password: string) {
        console.log(zxcvbn(password));
        const score = zxcvbn(password).score;
        props.editHatClaimPassword('passwordStrength', { score: score });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        props.editHatClaimPassword(name, value);

        if (name === 'password') {
            validatePasswordDebounce(value);
            props.editHatClaim(name, value);
        }
    };

    if (props.currentStep !== 2) {
        return null;
    }

    return (
        <div className="hat-claim-password flex-column-wrapper flex-content-center flex-align-items-center">
            <h2>{hatClaimMessages.choosePassword}</h2>
            <h3>testing.hubat.net</h3>
            <div className={'text-medium'}>{hatClaimMessages.dataPrecious}</div>
            <form>
                <input
                    name={"username"}
                    autoComplete={"username"}
                    type={"text"}
                    hidden={true}
                />

                <div className="input-password-container">
                    <input
                        type={hide1 ? 'password' : 'text'}
                        name="password"
                        autoComplete={'new-password'}
                        onChange={(e) => onChange(e)}
                        placeholder="Password" />
                        <button type="button" tabIndex={-1} onClick={() =>setHide1(!hide1)}>
                            <i className={'material-icons'}>{hide1 ? ' visibility_off' : ' visibility'}</i>
                        </button>
                </div>
                <div className="input-password-container">
                    <input
                        type={hide2 ? 'password' : 'text'}
                        name="passwordConfirm"
                        autoComplete={'new-password'}
                        onChange={(e) => onChange(e)}
                        placeholder="Confirm Password" />
                    <button type="button" tabIndex={-1} onClick={() =>setHide2(!hide2)}>
                        <i className={'material-icons'}>{hide2 ? ' visibility_off' : ' visibility'}</i>
                    </button>
                </div>
            </form>
            <PasswordStrengthMeter passwordStrength={props.password.passwordStrength}/>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    hatClaim: state.hatClaim.hatClaim,
    currentStep: state.hatClaim.currentStep,
    password: state.hatClaim.password
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            editHatClaim,
            editHatClaimPassword
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HatClaimPassword);
