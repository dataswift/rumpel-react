import React from 'react';
import { useSelector } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Permissions } from '../../hmi-shared/Permissions/Permissions';
import {selectDependencyApps, selectParentApp} from "../../../../features/hat-login/hatLoginSlice";

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
        <div className={'hmi-text-grey'}>You are giving {parentApp.application.info.name} the following permissions:</div>

        <ExpansionPanel className={'expansion-panel'} square={false}>
          <ExpansionPanelSummary
            aria-controls="panel1a-content"
            expandIcon={<i className="material-icons">keyboard_arrow_down</i>}
            id="panel1a-header"
          >
            <div className={'hmi-card-title'}>Read and write access to folders.</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={'hmi-card-subtitle'}>
              {dependencyApps &&
                dependencyApps.map(depApp => {
                  return <Permissions appName={depApp.application.info.name} key={depApp.application.id} permissions={depApp.application.permissions} />;
                })}
              <Permissions appName={parentApp.application.info.name} permissions={parentApp.application.permissions} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  } else {
    return null;
  }
};
