import React from 'react';
import '../hat-login/HatLogin.scss';
import HatLoginParamValidation from '../hat-login/HatLoginParamValidation';
import HatLoginApplicationHandler from '../hat-login/HatApplicationHandler';
import HatLoginBuildRedirect from '../hat-login/HatLoginBuildRedirect';
import HatLoginSetupDependency from '../hat-login/HatLoginSetupDependency';
import HatLoginRedirectError from '../hat-login/HatLoginRedirectError';
import OauthPermissions from './OauthPermissions';

const Oauth: React.FC = () => {
  return (
    <HatLoginParamValidation>
      <HatLoginApplicationHandler>
        <HatLoginBuildRedirect>
          <HatLoginSetupDependency>
            <HatLoginRedirectError>
              <OauthPermissions />
            </HatLoginRedirectError>
          </HatLoginSetupDependency>
        </HatLoginBuildRedirect>
      </HatLoginApplicationHandler>
    </HatLoginParamValidation>
  );
};

export default Oauth;
