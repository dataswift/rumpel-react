import React from 'react';
import './HatClaimSuccess.scss';
import { AppState } from '../../../redux/reducer/rootReducer';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { editHatClaim } from '../redux/actions/hatClaimActions';
import { connect } from 'react-redux';
import hatDRLogo from '../../../assets/images/hat-data-rights.png';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HatClaimSuccess: React.FC<Props> = (props) => {
  if (props.currentStep !== 5) {
    return null;
  }

  return (
    <div className="hat-claim-success flex-column-wrapper flex-content-center flex-align-items-center">
      <h2>Success!</h2>
      <div className={'text-medium'}>Your HAT Microserver with the following URL has been claimed.</div>

      <div className="title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{props.hatClaim.hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>.{props.hatClaim.hatCluster}</h3>
        </div>
      </div>

      <div className={'your-hat-issuer'}>Your HAT issuer is</div>

      <div className="issuer-logo">
        <img src="https://cdn.dataswift.io/dataswift/logo/ds-full-dark.svg" alt={'Dataswift'} />
      </div>

      <div className="drp-image">
        <img src={hatDRLogo} alt={'Data rights protected'} />
      </div>

      <div className={'text-medium'}>
        This icon appears every time you access your HAT Microserver and whenever you issue instructions to your HAT
        Microserver. Data rights protection ensures your HAT Microserver is always secure and that the rights to your
        data are preserved.
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  hatClaim: state.hatClaim.hatClaim,
  currentStep: state.hatClaim.currentStep,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      editHatClaim,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HatClaimSuccess);
