import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApplications } from "../applications/applicationsSlice";
import { setRedirectError } from "./hatSetupLoginSlice";
import { selectParentApp, setDependencyApps, setDependencyTools, setParentApp } from "../hmi/hmiSlice";
import { getTools, selectTools } from "../tools/toolsSlice";
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

export const HatSetupLoginApplicationHandler: React.FC<Props> = props => {
  const applications = useSelector(selectApplications);
  const parentApp = useSelector(selectParentApp);
  const tools = useSelector(selectTools);
  const dispatch = useDispatch();

  useEffect(() => {
    if (applications && applications.length > 0) {
      const { application_id, name } = queryString.parse(window.location.search) as Query;

      const applicationId = application_id || name;
      const applicationIdSafe = applicationId?.toLowerCase();
      const parentApp = applications.find(app => app.application.id === applicationIdSafe);

      if (!parentApp || parentApp.application.kind.kind !== 'App') {
        dispatch(setRedirectError('application_misconfigured', 'application_id_not_found '));
        return;
      }

      const parentPlugDependencies = parentApp.application.dependencies?.plugs || [];
      const parentToolDependencies = parentApp.application.dependencies?.tools || [];

      dispatch(setParentApp(parentApp));
      dispatch(setDependencyApps(applications.filter(app => parentPlugDependencies.indexOf(app.application.id) > -1)));

      if (parentToolDependencies.length > 0) {
        dispatch(getTools());
      }
    }
  }, [applications, dispatch]);

  useEffect(() => {
    if (tools && tools.length > 0) {
      if (!parentApp) return;

      const parentToolDependencies = parentApp.application.dependencies?.tools || [];

      dispatch(setDependencyTools(tools.filter(tool => parentToolDependencies.indexOf(tool.id) !== -1)));
    }
  }, [parentApp, tools, dispatch]);

  return <>{props.children}</>;
};
