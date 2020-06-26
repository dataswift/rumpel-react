import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HatApplication } from "@dataswift/hat-js/lib/interfaces/hat-application.interface";
import { HatClientService } from "../../services/HatClientService";
import {
  selectDependencyApps, selectDependencyPlugsEnabled,
  selectDependencyToolsEnabled,
  selectDependencyToolsPending,
  selectParentApp, setDependencyTools
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
  dependencies?: string;
}

const HatLoginSetupDependency: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const plugsEnabled = useSelector(selectDependencyPlugsEnabled);
  const toolsEnabled = useSelector(selectDependencyToolsEnabled);
  const toolsPending = useSelector(selectDependencyToolsPending);

  useEffect(() => {
    const { application_id, name, redirect_uri, redirect, dependencies } =
        queryString.parse(window.location.search) as Query;

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

    const setupToolDependencies = async () => {
      try {
        const hatSvc = HatClientService.getInstance();

        if (!toolsEnabled) {
          if (toolsPending.length > 0) {
            const tool = await hatSvc.enableTool(toolsPending[0].id);

            if (tool && tool.parsedBody) {
              dispatch(setDependencyTools([tool.parsedBody]));
            }
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

    if (parentApp && parentApp.enabled && (!plugsEnabled || !toolsEnabled)) {
      if (!toolsEnabled) {
        setupToolDependencies();
      } else {
        setupAppDependencies(dependencyApps);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentApp, dependencyApps, plugsEnabled, toolsEnabled]);

  return <>{props.children}</>;
};

export default HatLoginSetupDependency;
