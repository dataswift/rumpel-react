import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import { environment } from "../../environment";
import {
  selectDependencyApps,
  selectDependencyPlugsAreActive,
  selectDependencyToolsEnabled,
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
  fallback?: string;
  internal?: string;
}

const HatLoginBuildRedirect: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyPlugsAreActive = useSelector(selectDependencyPlugsAreActive);
  const dependencyToolsAreEnabled = useSelector(selectDependencyToolsEnabled);
  const skipsDeps = useSelector(selectSkipDeps);

  useEffect(() => {
    const buildRedirect = async (app: HatApplication) => {
      const { redirect_uri, redirect, internal } =
          queryString.parse(window.location.search) as Query;

      const isInternal = internal === 'true';
      const redirectParam = redirect_uri || redirect;

      if (isInternal) {
        window.location.href = redirectParam || '';
      } else {
        const hatSvc = HatClientService.getInstance();

        try {
          const resAppLogin = await hatSvc.appLogin(app.application.id);

          if (resAppLogin?.parsedBody?.accessToken) {
            const { accessToken } = resAppLogin.parsedBody;
            const setup = app.application.setup;

            // TODO Change this logic to the new validRedirectUris field
            const isRedirectUrlValid = [setup.url, setup.iosUrl, setup.androidUrl, setup.testingUrl].includes(
              decodeURI(redirectParam || '')
            );

            const attemptedSetup = {
              applicationId: app.application.id,
              date: addMinutes(new Date(), 10)
            };

            sessionStorage.setItem('attempted_setup', JSON.stringify(attemptedSetup));

            if (isRedirectUrlValid) {
              // eslint-disable-next-line max-len
              window.location.href = `${ redirectParam?.replace('#', '%23') }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;
            } else {
              console.warn('Provided URL is not registered');

              hatSvc.sendReport('hmi_invalid_redirect_url', `${ app.application.id }: ${ redirectParam }`)
                .finally(() => {
                  // eslint-disable-next-line max-len
                  window.location.href = `${ redirectParam?.replace('#', '%23') }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;

                  if (environment.sandbox) {
                    // TODO Add successful redirection only in sandbox environment
                  } else {
                    // TODO Redirect with error parameters in production
                    // eslint-disable-next-line max-len
                    // window.location.href = `${ redirectParam }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }error=access_denied&error_reason=hmi_invalid_redirect_url`;
                  }
                });
            }
          }
        } catch (e) {}
      }
    };

    if ((parentApp && parentApp.active) &&
        ((dependencyPlugsAreActive && dependencyToolsAreEnabled) || skipsDeps)) {
      buildRedirect(parentApp);
      return;
    }

    const attemptedSetup = sessionStorage.getItem('attempted_setup');

    if (parentApp && parentApp.enabled && attemptedSetup) {
      const session = JSON.parse(attemptedSetup) as {applicationId: string, date: string};

      if ((session.applicationId === parentApp.application.id) && isFuture(parseISO(session.date))) {
        buildRedirect(parentApp);
        return;
      }
    }
  }, [parentApp, dependencyApps, dependencyPlugsAreActive, dependencyToolsAreEnabled, skipsDeps]);

  return <>{props.children}</>;
};

export default HatLoginBuildRedirect;
