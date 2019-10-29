import React, { useState } from 'react';
import './HatClaimPassword.scss';
import { hatClaimMessages } from "../messages-hat-claim";
import { IPasswordStrength, PasswordStrengthMeter } from "../../shared/PasswordStrengthMeter/PasswordStrengthMeter";
import { get } from "../../../services/BackendService";

interface Props {
    currentStep: number;
}

const HatClaimPassword: React.FC<Props> = props => {
    const initPasswordStrength: IPasswordStrength = { guesses: 0, strength: 0, isStrong: false };

    const [hide1, setHide1] = useState(true);
    const [hide2, setHide2] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState<IPasswordStrength>(initPasswordStrength);

    async function validatePassword(password: string) {
        const mHeaders = new Headers();
        mHeaders.append("password", password);
        const args: RequestInit = { method: "get", headers: mHeaders };

        try {
            const res = await get<IPasswordStrength>("/api/validate-password", args);
            if (res.parsedBody) {
                setPasswordStrength(res.parsedBody);
                // setHatClaim({...hatClaim, password: password});
            }
        } catch (err) {
            console.log("handle error here", err);
        }
    }

    if (props.currentStep !== 2) {
        return null;
    }

    return (
        <div className="hat-claim-password flex-column-wrapper flex-content-center flex-align-items-center">
            <h2>{hatClaimMessages.choosePassword}</h2>
            <h3>testing.hubat.net</h3>
            <div className={'text-medium'}>{hatClaimMessages.dataPrecious}</div>
            <form>
                <div className="input-password-container">
                    <input
                        type={hide1 ? 'password' : 'text'}
                        className="hat-rumpel-input"
                        name="hat-pass-input"
                        autoComplete={'new-password'}
                        placeholder="Password" />
                        <button type="button" tabIndex={-1} onClick={() =>setHide1(!hide1)}>
                            <i className={'material-icons'}>{hide1 ? ' visibility_off' : ' visibility'}</i>
                        </button>
                </div>
                <div className="input-password-container">
                    <input
                        type={hide2 ? 'password' : 'text'}
                        className="hat-rumpel-input"
                        name="hat-pass-input"
                        autoComplete={'new-password'}
                        placeholder="Confirm Password" />
                    <button type="button" tabIndex={-1} onClick={() =>setHide2(!hide2)}>
                        <i className={'material-icons'}>{hide2 ? ' visibility_off' : ' visibility'}</i>
                    </button>
                </div>
            </form>
            <PasswordStrengthMeter passwordStrength={{isStrong: true, guesses: 2, strength: 2}}/>
        </div>
    );
};

export default HatClaimPassword;
