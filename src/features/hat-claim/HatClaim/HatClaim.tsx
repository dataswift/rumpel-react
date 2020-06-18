import React, { useEffect } from 'react';
import './HatClaim.scss';
import HatClaimActions from '../HatClaimActions';
import HatClaimEmail from '../HatClaimEmail';
import HatClaimUrl from '../HatClaimUrl/HatClaimUrl';
import HatClaimPassword from '../HatClaimPassword';
import HatClaimUrlConfirmation from '../HatClaimConfirmation/HatClaimConfirmation';
import { useHistory, useParams } from 'react-router';
import { getParameterByName } from '../../../utils/query-params';
import { isEmail } from '../../../utils/validations';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../../redux/reducer/rootReducer';
import {
  editHatClaim,
  editHatClaimErrorMessage,
  editHatClaimPassword,
  setCurrentStep
} from '../redux/actions/hatClaimActions';
import { loadDynamicZxcvbn } from '../../../utils/load-dynamic-zxcvbn';
import { buildClaimRequest, claimHat } from '../hat-claim.service';
import HatClaimSuccess from '../HatClaimSuccess/HatClaimSuccess';
import { NotificationBanner } from "../../../components/banners/NotificationBanner/NotificationBanner";

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HatClaim: React.FC<Props> = props => {
  const { claimToken } = useParams();
  let history = useHistory();

  useEffect(() => {
    const email = getParameterByName('email');
    const host = window.location.hostname;

    const hatName = host.substring(0, host.indexOf('.'));
    const hatCluster = host.substring(host.indexOf('.') + 1);

    if (!!email) {
      props.editHatClaim('email', email);
      props.editHatClaim('hatName', hatName);
      props.editHatClaim('hatCluster', hatCluster);

      loadDynamicZxcvbn(() => {
        // zxcvbn ready
      });
    }
    // eslint-disable-next-line
  }, []);

  async function handleSubmission(nextStep: number) {
    try {
      props.editHatClaimErrorMessage('');
      const res = await claimHat(claimToken || '', buildClaimRequest(props.hatClaim));

      if (res.parsedBody) {
        changeStep(nextStep + 1);
      }
    } catch (e) {
      props.editHatClaimErrorMessage('Something went wrong, please try again');
      changeStep(nextStep - 1);
    }
  }

  const goToLogin = () => {
    history.replace('/user/login');
  };

  const changeStep = (newStep: number) => {
    if (newStep === 1) {
      if (isEmail(props.hatClaim.email)) {
        props.setCurrentStep(newStep);
      }
    } else if (newStep === 3) {
      if (props.password.passwordStrength.score >= 2 && props.password.password === props.password.passwordConfirm) {
        props.setCurrentStep(newStep);
      }
    } else if (newStep === 4) {
      handleSubmission(newStep);
    } else if (newStep === 5) {
      props.setCurrentStep(newStep);
    } else if (newStep === 6) {
      goToLogin();
    } else {
      props.setCurrentStep(newStep);
    }
  };

  return (
    <div className="hat-claim flex-column-wrapper">
      {props.errorMsg && <NotificationBanner type={'error'} message={props.errorMsg} />}
      <span className={'flex-spacer-small'} />
      <HatClaimEmail />
      <HatClaimUrl />
      <HatClaimPassword />
      <HatClaimUrlConfirmation currentStep={props.currentStep} />
      <HatClaimSuccess />

      <span className={'flex-spacer-large'} />
      <HatClaimActions currentStep={props.currentStep} setCurrentStep={newStep => changeStep(newStep)} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  hatClaim: state.hatClaim.hatClaim,
  currentStep: state.hatClaim.currentStep,
  password: state.hatClaim.password,
  errorMsg: state.hatClaim.errorMsg,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      editHatClaim,
      setCurrentStep,
      editHatClaimPassword,
      editHatClaimErrorMessage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HatClaim);
