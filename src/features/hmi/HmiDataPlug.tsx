import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDependencyApps, selectParentApp } from "./hmiSlice";
import HmiPermissionDialog from "./HmiPermissionDialog";
import { FormatMessage } from "../messages/FormatMessage";
import { AppCard } from "../../components/AppCard/AppCard";

export const HmiDataPlug: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);

  if (!parentApp || dependencyApps.length === 0) {
    return null;
  }

  return (
    <div>
      <div className={'hmi-section-title'}>
        <FormatMessage id={'hatters.hmi.plug.title'} />
      </div>
      <div className={'hmi-text-grey'}>
        <FormatMessage id={'hatters.hmi.plug.description'} />
      </div>

      {dependencyApps.map(app => {
        return <AppCard key={app.application.id} appId={app.application.id} appName={app.application.info.name} />;
      })}

      <div className={'hmi-text-grey'}>
        <FormatMessage id={'hatters.hmi.plug.takeActions'}
          values={{ name: parentApp.application.info.name, plug: dependencyApps[0].application.info.name }}
        />
      </div>

      <div className={'hmi-text-grey'}>
        <button className="link-button" type={'button'} onClick={() => setOpenDialog(true)}>
          <FormatMessage id={'hatters.hmi.plug.showPermissions'} />
        </button>
      </div>

      <HmiPermissionDialog
        open={openDialog}
        app={parentApp}
        dependencyApps={dependencyApps}
        switchDialog={() => setOpenDialog(!openDialog)}
      />
    </div>
  );
};
