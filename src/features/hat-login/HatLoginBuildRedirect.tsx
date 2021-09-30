import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import * as queryString from 'query-string';
import { addMinutes, isFuture, parseISO } from 'date-fns';
import { HatClientService } from '../../services/HatClientService';
import {
  selectDependencyApps,
  selectDependencyPlugsAreActive,
  selectDependencyToolsEnabled,
  selectParentApp,
} from '../hmi/hmiSlice';

type Props = {
  children: React.ReactNode;
};

type Query = {
  application_id?: string;
  name?: string;
  redirect_uri?: string;
  redirect?: string;
  fallback?: string;
  internal?: string;
};

const HatLoginBuildRedirect: React.FC<Props> = (props) => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyPlugsAreActive = useSelector(selectDependencyPlugsAreActive);
  const dependencyToolsAreEnabled = useSelector(selectDependencyToolsEnabled);

  useEffect(() => {
    const buildRedirect = async (app: HatApplication) => {
      const { redirect_uri, redirect, internal } = queryString.parse(
        window.location.search,
      ) as Query;

      const isInternal = internal === 'true';
      const redirectParam = redirect_uri || redirect;
      const redirectParamDecoded = decodeURIComponent(redirectParam || '');

      if (isInternal) {
        window.location.href = redirectParam || '/feed';
      } else {
        const hatSvc = HatClientService.getInstance();

        try {
          const resAppLogin = await hatSvc.appLogin(app.application.id);

          if (resAppLogin?.parsedBody?.accessToken) {
            const { accessToken } = resAppLogin.parsedBody;
            const { setup } = app.application;

            const isRedirectUrlValid = setup.validRedirectUris.includes(redirectParamDecoded);

            const attemptedSetup = {
              applicationId: app.application.id,
              date: addMinutes(new Date(), 10),
            };

            sessionStorage.setItem('attempted_setup', JSON.stringify(attemptedSetup));

            // This is a hack and ideally should be removed. This is what allows the log in via dataswift.io webpage,
            // without this check users are redirected back to the dataswift.io page with the token attached.
            // The problem is that the dataswift.io page has no idea what to do with the token and
            // users are stuck there. With this hack users are being redirected
            // back to their PDA Dashboard which is the intended behaviour.
            const isDataswiftWebsite = redirectParamDecoded?.includes(
              'www.dataswift.io/sign-up-login',
            );

            const paramTokem = redirectParam?.includes('?') ? '&' : '?';

            const url = isDataswiftWebsite
              ? `${window.location.origin}/feed`
              : `${redirectParam?.replace('#', '%23')}${paramTokem}token=${accessToken}`;

            if (isRedirectUrlValid) {
              // eslint-disable-next-line max-len
              window.location.href = url;
            } else {
              console.warn('Provided URL is not registered');

              hatSvc
                .sendReport('hmi_invalid_redirect_url', `${app.application.id}: ${redirectParam}`)
                .then(() => {
                  window.location.href = url;
                })
                .catch(() => {
                  window.location.href = url;
                });
            }
          }
        } catch (e) {
          // TODO: Error handling
        }
      }
    };

    if (
      parentApp &&
      parentApp.active &&
      !parentApp.needsUpdating &&
      dependencyPlugsAreActive &&
      dependencyToolsAreEnabled
    ) {
      buildRedirect(parentApp);
      return;
    }

    const attemptedSetup = sessionStorage.getItem('attempted_setup');

    if (parentApp && parentApp.enabled && attemptedSetup) {
      const session = JSON.parse(attemptedSetup) as { applicationId: string; date: string };

      if (session.applicationId === parentApp.application.id && isFuture(parseISO(session.date))) {
        buildRedirect(parentApp);
      }
    }
  }, [parentApp, dependencyApps, dependencyPlugsAreActive, dependencyToolsAreEnabled]);

  return <>{props.children}</>;
};

export default HatLoginBuildRedirect;
