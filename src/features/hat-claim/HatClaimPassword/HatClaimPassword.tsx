import React, { useEffect, useState } from 'react';
import './HatClaimPassword.scss';
import { hatClaimMessages } from '../messages-hat-claim';
import { AppState } from '../../../redux/reducer/rootReducer';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { editHatClaim, editHatClaimErrorMessage, editHatClaimPassword } from '../redux/actions/hatClaimActions';
import { connect } from 'react-redux';
import { PasswordStrengthMeter } from '../../../components/PasswordStrengthMeter/PasswordStrengthMeter';
const debounce = require('lodash.debounce');
declare const zxcvbn: any;

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HatClaimPassword: React.FC<Props> = (props) => {
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);

  const validatePasswordDebounce = debounce((p: string) => validatePassword(p), 400);

  const passwordMatchDebounce = debounce(
    () => passwordIsValid(props.password.password, props.password.passwordConfirm),
    400,
  );

  function validatePassword(password: string) {
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

  const passwordIsValid = (password: string, newPassword: string): boolean => {
    if (password === newPassword) {
      if (!(props.password.passwordStrength.score > 2)) {
        return false;
      }

      props.editHatClaimErrorMessage('');

      return true;
    } else {
      if (newPassword.length > 5) {
        props.editHatClaimErrorMessage("Your passwords don't match!");
      }

      return false;
    }
  };

  useEffect(() => {
    passwordMatchDebounce();
    // eslint-disable-next-line
  }, [props.password.password, props.password.passwordConfirm]);

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <div className="hat-claim-password flex-column-wrapper flex-content-center flex-align-items-center">
      <h2>{hatClaimMessages.choosePassword}</h2>
      <div className="title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{props.hatClaim.hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>.{props.hatClaim.hatCluster}</h3>
        </div>
      </div>
      <div className={'text-medium'}>{hatClaimMessages.dataPrecious}</div>
      <form>
        <input name={'username'} autoComplete={'username'} type={'text'} hidden={true} />

        <div className="input-password-container">
          <input
            type={hide1 ? 'password' : 'text'}
            name="password"
            autoComplete={'new-password'}
            value={props.hatClaim.password}
            onChange={(e) => onChange(e)}
            placeholder="Password"
          />
          <button type="button" tabIndex={-1} onClick={() => setHide1(!hide1)}>
            <i className={'material-icons'}>{hide1 ? ' visibility_off' : ' visibility'}</i>
          </button>
        </div>
        <div className="input-password-container">
          <input
            type={hide2 ? 'password' : 'text'}
            name="passwordConfirm"
            autoComplete={'new-password'}
            value={props.password.passwordConfirm}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
          />
          <button type="button" tabIndex={-1} onClick={() => setHide2(!hide2)}>
            <i className={'material-icons'}>{hide2 ? ' visibility_off' : ' visibility'}</i>
          </button>
        </div>
      </form>
      {props.password.password.length > 0 && (
        <PasswordStrengthMeter passwordStrength={props.password.passwordStrength} />
      )}
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
      editHatClaimPassword,
      editHatClaimErrorMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HatClaimPassword);
