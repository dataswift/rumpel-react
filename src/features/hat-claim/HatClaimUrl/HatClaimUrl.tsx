import React from 'react';
import './HatClaimUrl.scss';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { hatClaimMessages } from '../messages-hat-claim';
import { AppState } from '../../../redux/reducer/rootReducer';
import { editHatClaim } from '../redux/actions/hatClaimActions';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HatClaimUrl: React.FC<Props> = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div className="hat-claim-url flex-column-wrapper flex-content-center flex-align-items-center">
      <h2>{hatClaimMessages.yourHatUrl}</h2>
      <div className="title-hat-domain-wrapper">
        <div className="hat-name">
          <h3>{props.hatClaim.hatName}</h3>
        </div>
        <div className="hat-domain">
          <h3>.{props.hatClaim.hatCluster}</h3>
        </div>
      </div>
      <div className="text-medium">{hatClaimMessages.hatUrlDescription}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HatClaimUrl);
