import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getParameterByName } from "../../utils/query-params";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import { environment } from "../../environment";
import { selectDependencyApps, selectParentApp } from "../hmi/hmiSlice";

type Props = {
    children: React.ReactNode;
}

export const HatSetupLoginBuildRedirect: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);

  useEffect(() => {
    const buildRedirect = async (app: HatApplication) => {
      // Use internal login option when forcing HAT-native version through terms approval process
      const internal = getParameterByName('internal') === 'true';
      const redirect = getParameterByName('redirect');

      if (internal) {
        window.location.href = redirect || '';
      } else {
        const hatSvc = HatClientService.getInstance();

        try {
          const resAppLogin = await hatSvc.appLogin(app.application.id);

          if (resAppLogin?.parsedBody?.accessToken) {
            const { accessToken } = resAppLogin.parsedBody;
            const setup = app.application.setup;

            const isRedirectUrlValid = [setup.url, setup.iosUrl, setup.androidUrl, setup.testingUrl].includes(
              decodeURI(redirect || '')
            );

            if (isRedirectUrlValid) {
              // eslint-disable-next-line max-len
              window.location.href = `${ redirect }${ (redirect?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;
            } else {
              console.warn('Provided URL is not registered');

              hatSvc.sendReport('hmi_invalid_redirect_url', `${ app.application.id }: ${ redirect }`).finally(() => {
                if (environment.sandbox) {
                  // eslint-disable-next-line max-len
                  window.location.href = `${ redirect }${ (redirect?.indexOf('?') !== -1) ? '&' : '?' }token=${ accessToken }`;
                } else {
                  // eslint-disable-next-line max-len
                  window.location.href = `${ redirect }${ (redirect?.indexOf('?') !== -1) ? '&' : '?' }error=access_denied&error_reason=hmi_invalid_redirect_url`;
                }
              });
            }
          }
        } catch (e) {}
      }
    };

    if (parentApp && parentApp.setup && dependencyApps.every(app => app.enabled === true)) {
      buildRedirect(parentApp);
    }
  }, [parentApp, dependencyApps]);

  return <>{props.children}</>;
};
