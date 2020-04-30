import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getParameterByName } from "../../utils/query-params";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import { selectDependencyApps, selectParentApp } from "../hmi/hmiSlice";

type Props = {
    children: React.ReactNode;
}

export const HatSetupLoginSetupDependency: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);

  useEffect(() => {
    const setupAppDependencies = async (dependencies: HatApplication[]) => {
      const app = dependencies.filter(d => !d.enabled)[0];
      const callback = intermediateCallBackUrl(app.application.id);

      try {
        const hatSvc = HatClientService.getInstance();
        const res = await hatSvc.setupApplication(app.application.id);

        if (res?.parsedBody) {
          const resAppLogin = await hatSvc.appLogin(app.application.id);

          if (resAppLogin?.parsedBody?.accessToken) {
            // eslint-disable-next-line max-len
            window.location.href = `${ app.application.setup.url }?token=${ resAppLogin.parsedBody.accessToken }&redirect=${ callback }`;
          }
        }
      } catch (e) {
        console.log('Setup dependencies errored', e);
      }
    };

    const intermediateCallBackUrl = (appId?: string): string => {
      let url = window.location.href.split('?')[0];
      const name = getParameterByName('name')?.toLowerCase();
      const redirect = getParameterByName('redirect');
      const dependencies = getParameterByName('dependencies');

      url += `?name=${ name }%26redirect=${ redirect }`;

      if (dependencies) {
        // removes the application id from the dependency parameter
        const dependencyArray = dependencies.split(',').filter(item => item !== appId);
        if (dependencyArray && dependencyArray.length > 0) {
          url += `%26dependencies=${ dependencyArray.join() }`;
        }
      } else {
        if (dependencyApps) {
          const dependencyArray = dependencyApps
            .filter(app => app.application.id !== appId)
            .map(app => app.application.id);
          if (dependencyArray && dependencyArray.length > 0) {
            url += `%26dependencies=${ dependencyArray.join() }`;
          }
        }
      }

      return url.replace('#', '%23');
    };

    if (parentApp && parentApp.setup && !dependencyApps.every(app => app.enabled === true)) {
      setupAppDependencies(dependencyApps);
    }
  }, [parentApp, dependencyApps]);

  return <>{props.children}</>;
};
