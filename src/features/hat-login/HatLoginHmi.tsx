import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDependencyApps, selectDependencyTools, selectParentApp } from "../hmi/hmiSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import Hmi, { HmiType } from "hmi";
import 'hmi/dist/hmi.cjs.development.css';
import { onTermsAgreed, onTermsDeclined, selectErrorMessage, setRedirectError } from "./hatLoginSlice";
import { UpdateNotes } from "./UpdateNotes/UpdateNotes";
import { NotificationBanner } from "../../components/banners/NotificationBanner/NotificationBanner";

const HatLoginHmi: React.FC = () => {
  const hatName = window.location.host;
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const errorMessage = useSelector(selectErrorMessage);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyTools = useSelector(selectDependencyTools);

  const redirectBack = () => {
    dispatch(setRedirectError('hat_exception', 'enabling_application_failed'));
  };

  if ((!parentApp || parentApp.active) || (parentApp.application.dependencies &&
      parentApp.application.dependencies.plugs?.length !== dependencyApps.length) ||
      (parentApp.application.dependencies &&
          parentApp.application.dependencies.tools?.length !== dependencyTools.length)) {
    return <LoadingSpinner loadingText={'Loading permissions...'}/>;
  }

  return (
    <div>
      <NotificationBanner type={'error'} display={!!errorMessage} fixed={true}>
        <div className={'hat-login-notification'}>
          <p>
            An error has occurred, please use the back button to return to the previous page <br />
            and try confirming again. If this error persists please{' '}
            <a href={'mailto:contact@dataswift.io'} className={'link-button'}>contact us</a>
          </p>
          <button className={'btn btn-accent'} onClick={() => redirectBack()}>Back</button>
        </div>
      </NotificationBanner>

      <span className={'flex-spacer-small'} />
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
