import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDependencyApps, selectDependencyTools, selectParentApp } from "../hmi/hmiSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import Hmi, { HmiType } from "hmi";
import 'hmi/dist/hmi.cjs.development.css';
import { onTermsAgreed, onTermsDeclined } from "./hatLoginSlice";
import { UpdateNotes } from "./UpdateNotes/UpdateNotes";

const HatLoginHmi: React.FC = () => {
  const hatName = window.location.host;
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyTools = useSelector(selectDependencyTools);

  if ((!parentApp || parentApp.enabled) || (parentApp.application.dependencies &&
      parentApp.application.dependencies.plugs?.length !== dependencyApps.length) ||
      (parentApp.application.dependencies &&
          parentApp.application.dependencies.tools?.length !== dependencyTools.length)) {
    return <LoadingSpinner loadingText={'Loading permissions...'}/>;
  }

  return (
    <div>
      {parentApp && parentApp.needsUpdating && parentApp.application.info.updateNotes ? (
        <UpdateNotes app={parentApp.application}
          onApproved={() => dispatch(onTermsAgreed(parentApp?.application.id || ''))}
          onRejected={() => dispatch(onTermsDeclined())}
        />
      ) : (
        <Hmi hmiType={HmiType.login.daas}
          parentApp={parentApp.application}
          hatName={hatName}
          dependencyTools={dependencyTools.map(tool => tool.info.name)}
          dependencyApps={dependencyApps.map(app => app.application)}
          onApproved={() => dispatch(onTermsAgreed(parentApp?.application.id || ''))}
          onRejected={() => dispatch(onTermsDeclined())}
        />)
      }
    </div>
  );
};

export default HatLoginHmi;
