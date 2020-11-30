import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDependencyApps, selectDependencyTools, selectParentApp } from "../hmi/hmiSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { HmiType, HmiV2 } from "hmi";
import { onTermsAgreed, onTermsDeclined, selectErrorMessage, setRedirectError } from "../hat-login/hatLoginSlice";
import { NotificationBanner } from "../../components/banners/NotificationBanner/NotificationBanner";
import { selectLanguage } from "../language/languageSlice";
import { isHmiLoading } from "../hat-login/helpers";

const OauthPermissions: React.FC = () => {
  const hatName = window.location.host;
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const parentApp = useSelector(selectParentApp);
  const errorMessage = useSelector(selectErrorMessage);
  const dependencyApps = useSelector(selectDependencyApps);
  const dependencyTools = useSelector(selectDependencyTools);

  const redirectBack = () => {
    dispatch(setRedirectError('hat_exception', 'enabling_application_failed'));
  };

  if (!parentApp || isHmiLoading(parentApp, dependencyApps, dependencyTools)) {
    return <LoadingSpinner loadingText={'Loading permissions...'}/>;
  }

  return (
    <div>
      <NotificationBanner type={'error'} display={!!errorMessage} fixed>
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
      {parentApp &&
      <HmiV2 hmiType={HmiType.login.daas}
        parentApp={parentApp.application}
        email={hatName}
        language={language}
        dependencyTools={dependencyTools.map(tool => tool.info.name)}
        dependencyApps={dependencyApps.map(app => app.application)}
        onApproved={() => dispatch(onTermsAgreed(parentApp?.application.id || ''))}
        onRejected={() => dispatch(onTermsDeclined())}
      />
      }
    </div>
  );
};

export default OauthPermissions;
