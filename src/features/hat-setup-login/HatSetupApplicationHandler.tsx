import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApplications } from "../applications/applicationsSlice";
import { getParameterByName } from "../../utils/query-params";
import { setRedirectError } from "./hatSetupLoginSlice";
import { selectParentApp, setDependencyApps, setDependencyTools, setParentApp } from "../hmi/hmiSlice";
import { getTools, selectTools } from "../tools/toolsSlice";

type Props = {
    children: React.ReactNode;
}
export const HatSetupLoginApplicationHandler: React.FC<Props> = props => {
  const applications = useSelector(selectApplications);
  const parentApp = useSelector(selectParentApp);
  const tools = useSelector(selectTools);
  const dispatch = useDispatch();

  useEffect(() => {
    if (applications && applications.length > 0) {
      const applicationId = getParameterByName("application_id") || getParameterByName("name");
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
