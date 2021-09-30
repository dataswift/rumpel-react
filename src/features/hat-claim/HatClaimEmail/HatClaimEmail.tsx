import React from 'react';
import './HatClaimEmail.scss';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { hatClaimMessages } from '../messages-hat-claim';
import { AppState } from '../../../redux/reducer/rootReducer';
import { editHatClaim } from '../redux/actions/hatClaimActions';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HatClaimEmail: React.FC<Props> = (props) => {
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    <div className="hat-claim-email flex-column-wrapper flex-content-center flex-align-items-center">
      <h2>{hatClaimMessages.claimYourHat}</h2>
      <div className="text-medium">{hatClaimMessages.informationOnlyUsed}</div>
      <input
        placeholder="email"
        type="email"
        disabled
        value={props.hatClaim.email || 'Unspecified email address'}
      />
      <div className="checkbox-container">
        <label className="text-medium" htmlFor="newsletterOptin">
          {hatClaimMessages.subscribeMadHatters}
          <input
            id="newsletterOptin"
            name="newsletterOptin"
            type="checkbox"
            checked={props.hatClaim.optins}
            onChange={(event) => props.editHatClaim('optins', event.target.checked)}
          />
          <span className="checkbox-checkmark" />
        </label>
      </div>
      <div className="text-small text-align-left">
        You can change your mind at any time by clicking the unsubscribe link in the footer of any
        email you receive from us. Learn how we treat your information with respect in our&nbsp;
        <a
          href="https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy.
        </a>
        &nbsp; By clicking ‘Next’ you agree to have read the privacy policy.
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

export default connect(mapStateToProps, mapDispatchToProps)(HatClaimEmail);
