import React from "react";
import HatLoginParamValidation from "./HatLoginParamValidation";
import HatLoginHmi from "./HatLoginHmi";
import HatLoginRedirectError from "./HatLoginRedirectError";
import HatLoginApplicationHandler from "./HatApplicationHandler";
import HatLoginBuildRedirect from "./HatLoginBuildRedirect";
import HatLoginSetupDependency from "./HatLoginSetupDependency";
import './HatLogin.scss';

const HatLogin: React.FC = () => {
  return (
    <HatLoginParamValidation>
      <HatLoginApplicationHandler>
        <HatLoginBuildRedirect>
          <HatLoginSetupDependency>
            <HatLoginRedirectError>
              <HatLoginHmi />
            </HatLoginRedirectError>
          </HatLoginSetupDependency>
        </HatLoginBuildRedirect>
      </HatLoginApplicationHandler>
    </HatLoginParamValidation>
  );
};

export default HatLogin;
