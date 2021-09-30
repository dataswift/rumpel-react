import React from 'react';
import LandingPageIllustration from '../../assets/images/landing-page-illustration.svg';

const LandingIllustration: React.FC = () => {
  return (
    <div className="landing-illustration">
      <h2>The Home of your Personal Data</h2>
      <img className="landing-illustration-image" src={LandingPageIllustration} alt="" />
    </div>
  );
};

export default LandingIllustration;
