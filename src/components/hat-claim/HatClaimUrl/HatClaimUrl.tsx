import React from 'react';
import './HatClaimUrl.scss';
import { hatClaimMessages } from "../messages-hat-claim";
import { AppState } from "../../../redux/reducer/rootReducer";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { editHatClaim } from "../redux/actions/hatClaimActions";
import { connect } from "react-redux";

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const HatClaimUrl: React.FC<Props> = props => {
    if (props.currentStep !== 1) {
        return null;
    }

    return (
        <div className="hat-claim-url flex-column-wrapper flex-content-center flex-align-items-center">
            <h2>{hatClaimMessages.yourHatUrl}</h2>
            <h3>testing.hubat.net</h3>
            <div className={'text-medium'}>{hatClaimMessages.hatUrlDescription}</div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HatClaimUrl);