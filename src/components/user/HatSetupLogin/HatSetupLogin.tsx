import React, { useEffect, useState } from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { Hmi } from '../../hmi/Hmi/Hmi';
import { HmiType } from '../../../features/hmi/hmi.interface';
import {
  getApplications,
  selectDependencyApps,
  selectParentApp,
  setParentApp,
  setupApplication,
} from '../../../features/hat-login/hatLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HmiActions } from '../../hmi/hmi-shared/HmiActions/HmiActions';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HatClientService } from '../../../services/HatClientService';
import {environment} from "../../../environment";

const HatSetupLogin: React.FC = () => {
  const dispatch = useDispatch();
  const [displayHmi, setDisplayHmi] = useState(false);
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const query = useQuery();

  useEffect(() => {
    const name = query.get('name')?.toLowerCase();
    const redirect = query.get('redirect');

    if (name && redirect) {
      dispatch(getApplications(name));
    }
  }, []);

  useEffect(() => {
    if (!parentApp) return;

    const name = query.get('name')?.toLowerCase();
    const redirect = query.get('redirect');

    if (name && redirect) {
      const dependencies = query.get('dependencies');

      const dependencyAppsArray = dependencies?.split(',');
      // dispatch(getApplications(name, dependencyAppsArray));
      if (dependencies) {
        if (dependencyAppsArray && dependencyAppsArray.length > 0) {
          setupAppDependencies(dependencyApps);
        }
      } else {
        const dependenciesAreSetup = dependencyApps.every((app) => app.enabled);
        const parentAppIsReady = parentApp.enabled && !parentApp.needsUpdating;

        console.log({ parentAppIsReady, dependenciesAreSetup });

        if (parentAppIsReady && dependenciesAreSetup) {
          buildRedirect(parentApp);

          // this.hatCacheSvc.clearCache();
        } else if (parentAppIsReady) {
          setupAppDependencies(dependencyApps);
        } else {
          setDisplayHmi(true);
        }
      }
    } else {
    }
  }, [parentApp]);

  const setupAppDependencies = async (dependencies: HatApplication[]) => {
    console.log(dependencies);
    const app = dependencies.filter((d) => !d.enabled)[0];
    const callback = intermediateCallBackUrl(app.application.id);

    try {
      const hatSvc = HatClientService.getInstance();
      const res = await hatSvc.setupApplication(app.application.id);

      if (res?.parsedBody) {
        const resAppLogin = await hatSvc.appLogin(app.application.id);
        if (resAppLogin?.parsedBody?.accessToken) {
          window.location.href = `${app.application.setup.url}?token=${resAppLogin.parsedBody.accessToken}&redirect=${callback}`;
        }
      }
    } catch (e) {}
  };

  const intermediateCallBackUrl = (appId?: string): string => {
    let url = window.location.href.split('?')[0];
    const name = query.get('name')?.toLowerCase();
    const redirect = query.get('redirect');
    const dependencies = query.get('dependencies');

    url += `?name=${name}%26redirect=${redirect}`;

    if (dependencies) {
      // removes the application id from the dependency parameter
      const dependencyArray = dependencies.split(',').filter((item) => item !== appId);
      if (dependencyArray && dependencyArray.length > 0) {
        url += `%26dependencies=${dependencyArray.join()}`;
      }
    } else {
      if (dependencyApps) {
        const dependencyArray = dependencyApps
          .filter((app) => app.application.id !== appId)
          .map((app) => app.application.id);
        if (dependencyArray && dependencyArray.length > 0) {
          url += `%26dependencies=${dependencyArray.join()}`;
        }
      }
    }

    return url.replace('#', '%23');
  };

  const callBackUrlWithError = (error: string, errorReason: string): string => {
    const redirect = query.get('redirect');

    const url = `${redirect}?error=${error}%26error_reason=${errorReason}`;

    return url.replace('#', '%23');
  };

  const buildRedirect = async (app: HatApplication) => {
    // Use internal login option when forcing HAT-native version through terms approval process
    const internal = query.get('internal') === 'true';
    const redirect = query.get('redirect');

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
            decodeURI(redirect || ''),
          );

          if (isRedirectUrlValid) {
            window.location.href = `${redirect}${redirect?.includes('?') ? '&' : '?'}token=${accessToken}`;

          } else {
            console.warn('Provided URL is not registered');

            if (environment.sandbox) {
              hatSvc.sendReport('hmi_invalid_redirect_url', `${app.application.id}: ${redirect}`).then((res) => {
                window.location.href = `${redirect}${redirect?.includes('?') ? '&' : '?'}token=${accessToken}`;
              });
            } else {
              hatSvc.sendReport('hmi_invalid_redirect_url', `${app.application.id}: ${redirect}`).then((res) => {
                window.location.href = `${redirect}${redirect?.includes('?') ? '&' : '?'}error=access_denied&error_reason=hmi_invalid_redirect_url`;
              });
            }
          }
        }
      } catch (e) {}
    }
  };

  const onTermsAgreed = async () => {
    if (parentApp) {
      const hatSvc = HatClientService.getInstance();
      try {
        const res = await hatSvc.setupApplication(parentApp.application.id);
        if (res?.parsedBody) {
          dispatch(setParentApp(res.parsedBody));
          if (dependencyApps.every((app) => app.enabled === true)) {
            buildRedirect(res.parsedBody);
          } else {
            setupAppDependencies(dependencyApps);
          }
        }
      } catch (e) {}

      dispatch(setupApplication(parentApp.application.id));
    }
  };

  const declineTerms = () => {
    const hatSvc = HatClientService.getInstance();
    const fallback = query.get('fallback');
    const internal = query.get('internal') === 'true';

    hatSvc.sendReport('hmi_declined').then((res) => {
      hatSvc.logout();

      if (internal) {
        window.location.href = fallback || '';
      } else {
        window.location.href = callBackUrlWithError('access_denied', 'user_cancelled');
      }
    });
  };

  if (displayHmi) {
    return (
      <div>
        {parentApp && <Hmi hmiType={HmiType.daas} />}
        <HmiActions
          registrationType={HmiType.daas}
          nextStep={() => onTermsAgreed()}
          cancelStep={() => declineTerms()}
        />
      </div>
    );
  } else {
    return <div>Spinner</div>;
  }
};

export default HatSetupLogin;
