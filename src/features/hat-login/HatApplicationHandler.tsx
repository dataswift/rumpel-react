import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as queryString from 'query-string';
import { selectApplications } from '../applications/applicationsSlice';
import { selectErrorMessage, setRedirectError } from './hatLoginSlice';
import {
  selectParentApp,
  setDependencyApps,
  setDependencyTools,
  setParentApp,
} from '../hmi/hmiSlice';
import { getTools, selectTools } from '../tools/toolsSlice';

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

const HatLoginApplicationHandler: React.FC<Props> = (props) => {
  const errorMessage = useSelector(selectErrorMessage);
  const applications = useSelector(selectApplications);
  const parentApp = useSelector(selectParentApp);
  const tools = useSelector(selectTools);
  const dispatch = useDispatch();

  useEffect(() => {
    if (applications && applications.length > 0) {
      const { application_id, name } = queryString.parse(window.location.search) as Query;

      const applicationId = application_id || name;
      const applicationIdSafe = applicationId?.toLowerCase();
      const parentApp = applications.find((app) => app.application.id === applicationIdSafe);

      if (!parentApp || ['App', 'DataPlug'].indexOf(parentApp.application.kind.kind) === -1) {
        dispatch(setRedirectError('application_misconfigured', 'application_id_not_found '));
        return;
      }

      const parentPlugDependencies = parentApp.application.dependencies?.plugs || [];
      const parentToolDependencies = parentApp.application.dependencies?.tools || [];

      dispatch(setParentApp(parentApp));
      dispatch(
        setDependencyApps(
          applications.filter((app) => parentPlugDependencies.indexOf(app.application.id) > -1),
        ),
      );

      if (parentToolDependencies.length > 0) {
        dispatch(getTools());
      }
    }
  }, [applications, dispatch]);

  useEffect(() => {
    if (tools && tools.length > 0) {
      if (!parentApp) return;

      const parentToolDependencies = parentApp.application.dependencies?.tools || [];

      dispatch(
        setDependencyTools(tools.filter((tool) => parentToolDependencies.indexOf(tool.id) !== -1)),
      );
    }
  }, [parentApp, tools, dispatch]);

  const redirectBack = () => {
    dispatch(setRedirectError('hat_exception', 'internal_server_error'));
  };

  if (errorMessage && applications.length === 0) {
    return (
      <div>
        <div className="app-error">
          <h3 className="app-error-header">Looks like something went wrong</h3>
          <p className="app-error-text">{errorMessage}</p>
          <button className="btn btn-accent" onClick={() => redirectBack()}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
};

export default HatLoginApplicationHandler;
