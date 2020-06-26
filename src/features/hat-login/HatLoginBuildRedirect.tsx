import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import { environment } from "../../environment";
import {
  selectDependencyApps,
  selectDependencyPlugsEnabled,
  selectDependencyToolsEnabled,
  selectParentApp
} from "../hmi/hmiSlice";
import * as queryString from "query-string";

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
  const dependencyAppsEnabled = useSelector(selectDependencyPlugsEnabled);
  const dependencyToolsEnabled = useSelector(selectDependencyToolsEnabled);

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

            const isRedirectUrlValid = [setup.url, setup.iosUrl, setup.androidUrl, setup.testingUrl].includes(
              decodeURI(redirectParam || '')
            );

            if (isRedirectUrlValid) {
              // eslint-disable-next-line max-len
              window.location.href = `${ redirectParam }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;
            } else {
              console.warn('Provided URL is not registered');

              hatSvc.sendReport('hmi_invalid_redirect_url', `${ app.application.id }: ${ redirect }`).finally(() => {
                if (environment.sandbox) {
                  // eslint-disable-next-line max-len
                  window.location.href = `${ redirectParam }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;
                } else {
                  // eslint-disable-next-line max-len
                  window.location.href = `${ redirectParam }${ (redirectParam?.indexOf('?') !== -1) ? '&' : '?' }error=access_denied&error_reason=hmi_invalid_redirect_url`;
                }
              });
            }
          }
        } catch (e) {}
      }
    };

    if (parentApp && parentApp.enabled && dependencyAppsEnabled && dependencyToolsEnabled) {
      buildRedirect(parentApp);
    }
  }, [parentApp, dependencyApps, dependencyAppsEnabled, dependencyToolsEnabled]);

  return <>{props.children}</>;
};

export default HatLoginBuildRedirect;
