import React from 'react';
import { useSelector } from 'react-redux';
import { selectDependencyApps, selectParentApp } from "./hmiSlice";
import { HmiPermissions } from "./HmiPermissions";
import ExpansionPanel from "../../components/ExpansionPanel/ExpansionPanel";

export const HmiBaasReadAndWrite: React.FC = () => {
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);

  if (!parentApp) {
    return null;
  }

  if (parentApp.application.permissions) {
    return (
      <div>
        <div className={'hmi-section-title'}>{parentApp.application.info.name} wants to access your HAT PDA.</div>
        <div className={'hmi-text-grey'}>
          You are giving {parentApp.application.info.name} the following permissions:
        </div>

        <ExpansionPanel title={
          parentApp.application.kind.kind === 'App' ? 'hatters.hmi.readAndWrite' : 'hatters.hmi.writeAccess'
        }>
          <div className={'hmi-card-subtitle hmi-card-content'}>
            {dependencyApps &&
            dependencyApps.map(depApp => {
              return (
                <HmiPermissions
                  appName={depApp.application.info.name}
                  key={depApp.application.id}
                  permissions={depApp.application.permissions}
                />
              );
            })}
            <HmiPermissions
              appName={parentApp.application.info.name}
              permissions={parentApp.application.permissions}
            />
          </div>
        </ExpansionPanel>
      </div>
    );
  } else {
    return null;
  }
};
