import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getApplicationById, getApplications, selectApplicationById, selectApplications } from './applicationsSlice';
import './HatApplication.scss';
import { Hmi } from 'hmi';
import {
  selectDependencyApps,
  selectDependencyTools,
  setDependencyApps,
  setDependencyTools,
  setParentApp,
} from '../hmi/hmiSlice';
import { getTools, selectTools } from '../tools/toolsSlice';

const HatApplicationPermissions: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { appId } = useParams<{ appId: string }>();
  const app = useSelector(selectApplicationById(appId));
  const apps = useSelector(selectApplications);
  const tools = useSelector(selectTools);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyTools = useSelector(selectDependencyTools);

  useEffect(() => {
    if (!app) {
      dispatch(getApplicationById(appId));
      return;
    }

    const parentPlugDependencies = app.application.dependencies?.plugs || [];
    const parentToolDependencies = app.application.dependencies?.tools || [];

    dispatch(setParentApp(app));
    if (parentPlugDependencies.length > 0 && apps.length < 2) {
      dispatch(getApplications());
    }
    dispatch(setDependencyApps(apps.filter((app) => parentPlugDependencies.indexOf(app.application.id) > -1)));

    if (parentToolDependencies.length > 0 && tools.length === 0) {
      dispatch(getTools());
    }

    dispatch(setDependencyTools(tools.filter((tool) => parentToolDependencies.indexOf(tool.id) !== -1)));
  }, [dispatch, app, appId, apps, tools]);

  if (
    !app ||
    (app.application.dependencies && app.application.dependencies.plugs?.length !== dependencyApps.length) ||
    (app.application.dependencies && app.application.dependencies.tools?.length !== dependencyTools.length)
  ) {
    return null;
  }

  return (
    <Hmi
      email={''}
      parentApp={app.application}
      dependencyApps={dependencyApps.map((app) => app.application)}
      dependencyTools={dependencyTools.map((tool) => tool.info.name)}
      onApproved={() => history.push(`/explore/${app.application.kind.kind}/${app.application.id}`)}
      onRejected={() => {}}
    />
  );
};

export default HatApplicationPermissions;
