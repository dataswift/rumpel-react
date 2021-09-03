import React from 'react';
import './LandingLoginPage.scss';
import LandingIllustration from '../../components/Landing/LandingIllustration';
import LandingLoginView from '../../components/Landing/LandingLoginView';

const LandingLoginPage: React.FC = () => {
  return (
    <div className="landing-login-page">
      <LandingIllustration />
      <LandingLoginView />
    </div>
  );
};

export default LandingLoginPage;
