import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApplications } from "../applications/applicationsSlice";
import { getParameterByName } from "../../utils/query-params";
import { setRedirectError } from "./hatSetupLoginSlice";
import { setDependencyApps, setParentApp } from "../hmi/hmiSlice";

type Props = {
    children: React.ReactNode;
}
export const HatSetupLoginApplicationHandler: React.FC<Props> = props => {
  const applications = useSelector(selectApplications);
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

      const parentDependencies = parentApp.application.setup.dependencies || [];

      dispatch(setParentApp(parentApp));
      dispatch(setDependencyApps(applications.filter(app => parentDependencies.indexOf(app.application.id) > -1)));
    }
  }, [applications, dispatch]);

  return <>{props.children}</>;
};
