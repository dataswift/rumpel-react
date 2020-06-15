import React from "react";
import { HatSetupLoginParamValidation } from "./HatSetupLoginParamValidation";
import { HatSetupLoginHmi } from "./HatSetupLoginHmi";
import { HatSetupLoginRedirectError } from "./HatSetupLoginRedirectError";
import { HatSetupLoginApplicationHandler } from "./HatSetupApplicationHandler";
import { HatSetupLoginBuildRedirect } from "./HatSetupLoginBuildRedirect";
import { HatSetupLoginSetupDependency } from "./HatSetupLoginSetupDependency";

const HatSetupLogin: React.FC = () => {
  return (
    <HatSetupLoginParamValidation>
      <HatSetupLoginApplicationHandler>
        <HatSetupLoginBuildRedirect>
          <HatSetupLoginSetupDependency>
            <HatSetupLoginRedirectError>
              <HatSetupLoginHmi />
            </HatSetupLoginRedirectError>
          </HatSetupLoginSetupDependency>
        </HatSetupLoginBuildRedirect>
      </HatSetupLoginApplicationHandler>
    </HatSetupLoginParamValidation>
  );
};

export default HatSetupLogin;
