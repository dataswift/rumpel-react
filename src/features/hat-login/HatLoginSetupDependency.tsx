import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import {
  selectDependencyApps,
  selectDependencyPlugsAreActive,
  selectParentApp
} from "../hmi/hmiSlice";
import * as queryString from "query-string";
import { addMinutes, isFuture, parseISO } from "date-fns";
import { selectSkipDeps } from "./hatLoginSlice";

type Props = {
    children: React.ReactNode;
}

type Query = {
  application_id?: string;
  name?: string;
  redirect_uri?: string;
  redirect?: string;
  dependencies?: string;
}

const HatLoginSetupDependency: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const plugsAreActive = useSelector(selectDependencyPlugsAreActive);
  const skipsDeps = useSelector(selectSkipDeps);

  useEffect(() => {
    const { application_id, name, redirect_uri, redirect, dependencies } =
        queryString.parse(window.location.search) as Query;

    const setupAppDependencies = async (dependencies: HatApplication[]) => {
      const app = dependencies.filter(d => !d.active)[0];
      const callback = intermediateCallBackUrl(app.application.id);

      try {
        const hatSvc = HatClientService.getInstance();

        if (app?.application.id) {
          const resAppLogin = await hatSvc.appLogin(app.application.id);

          if (resAppLogin?.parsedBody?.accessToken) {
            const attemptedSetup = {
              applicationId: parentApp?.application.id,
              date: addMinutes(new Date(), 10)
            };

            sessionStorage.setItem('attempted_setup', JSON.stringify(attemptedSetup));

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
      const applicationId = application_id || name;
      const applicationIdSafe = applicationId?.toLowerCase();
      const redirectParam = redirect_uri || redirect;
      const dependenciesParam = dependencies;

      url += `?application_id=${ applicationIdSafe }%26redirect_uri=${ redirectParam }`;

      if (dependenciesParam) {
        // removes the application id from the dependency parameter
        const dependencyArray = dependenciesParam.split(',').filter(item => item !== appId);
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

    const attemptedSetup = sessionStorage.getItem('attempted_setup');

    if (parentApp && dependencyApps && dependencyApps.length > 0 && attemptedSetup) {
      const session = JSON.parse(attemptedSetup) as {applicationId: string, date: string};

      if ((session.applicationId === parentApp.application.id) && isFuture(parseISO(session.date))) {
        return;
      }
    }

    if (parentApp && parentApp.active && !plugsAreActive && !skipsDeps) {
      setupAppDependencies(dependencyApps);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentApp, dependencyApps, plugsAreActive]);

  return <>{props.children}</>;
};

export default HatLoginSetupDependency;
