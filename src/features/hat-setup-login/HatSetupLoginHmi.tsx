import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDependencyApps, selectParentApp } from "../hmi/hmiSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import Hmi, { HmiType } from "hmi";
import 'hmi/dist/hmi.cjs.development.css';
import { onTermsAgreed, onTermsDeclined } from "./hatSetupLoginSlice";

export const HatSetupLoginHmi: React.FC = () => {
  const hatName = window.location.host;
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApps);

  if ((!parentApp || parentApp.setup) || (parentApp.application.setup.dependencies &&
      parentApp.application.setup.dependencies?.length !== dependencyApps.length)) {
    return <LoadingSpinner loadingText={'Loading permissions'}/>;
  }

  return (
    <div>
      <Hmi hmiType={HmiType.login.daas}
        parentApp={parentApp.application} 
        hatName={hatName}
        dependencyApps={dependencyApps.map(app => app.application)}
        onApproved={() => dispatch(onTermsAgreed(parentApp?.application.id || ''))}
        onRejected={() => dispatch(onTermsDeclined())}
      />
    </div>
  );
};
