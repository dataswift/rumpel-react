import React, { useEffect } from 'react';
import './HatLogin.scss';
import {
  selectErrorMessage,
  setErrorMessage,
  setupApplication
} from '../hatLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HatClientService } from '../../../services/HatClientService';
import { selectParentApp, setParentApp } from "../../hmi/hmiSlice";
import { getApplications, selectApplications } from "../../applications/applicationsSlice";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { UpdateNotes } from "../UpdateNotes/UpdateNotes";
import Hmi, { HmiType } from "hmi";
import 'hmi/dist/hmi.cjs.development.css';
import * as queryString from "query-string";

type Query = {
  application_id?: string;
  name?: string;
  redirect_uri?: string;
  redirect?: string;
  fallback?: string;
  internal?: string;
}

const HatLogin: React.FC = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplications);
  const parentApp = useSelector(selectParentApp);
  const errorMessage = useSelector(selectErrorMessage);
  const { application_id, name, redirect_uri, redirect, fallback, internal } =
      queryString.parse(window.location.search) as Query;
  const applicationId = application_id || name;
  const safeApplicationId = applicationId?.toLowerCase();
  const redirectParam = redirect_uri || redirect;

  useEffect(() => {
    if (safeApplicationId && redirectParam) {
      dispatch(getApplications());
    } else {
      dispatch(setErrorMessage('ERROR: App details incorrect. Please contact the app developer and let them know.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agreeTerms = () => {
    if (safeApplicationId) {
      dispatch(setupApplication(safeApplicationId));
    }
  };

  const declineTerms = () => {
    const hatSvc = HatClientService.getInstance();
    hatSvc.logout();

    if (fallback) {
      window.location.href = fallback;
    }
  };

  useEffect(() => {
    const buildRedirect = (appName: string): void => {
      // Use internal login option when forcing HAT-native version through terms approval process
      const isInternal = internal === 'true';

      if (isInternal) {
        if (redirectParam) {
          window.location.href = redirectParam;
        }
      } else {
        const hatSvc = HatClientService.getInstance();
        hatSvc.appLogin(appName).then(res => {
          if (res && res.parsedBody) {
            const accessToken = res.parsedBody.accessToken;
            const finalRedirect =
                `${ redirectParam }${ redirectParam?.includes('?') ? '&' : '?' }token=${ accessToken }`;
            window.location.href = finalRedirect.replace(/#/gi, '%23');
          }
        });
      }
    };

    if (parentApp && parentApp.enabled && !parentApp.needsUpdating) {
      buildRedirect(parentApp.application.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentApp]);

  useEffect(() => {
    if (applications && applications.length > 0) {
      const parentApp = applications.find(app => app.application.id === safeApplicationId);

      if (!parentApp) {
        const hatSvc = HatClientService.getInstance();
        hatSvc.logout();

        if (fallback) {
          window.location.href = fallback;
        }
        return;
      }

      dispatch(setParentApp(parentApp));
    }
  }, [applications, dispatch, redirectParam, safeApplicationId, fallback]);

  if (errorMessage) {
    return (
      <div>
        <div className="app-error">
          <h3 className="app-error-header">Ooops... Looks like something went wrong.</h3>
          <p className="app-error-text">{errorMessage}</p>
        </div>
      </div>
    );
  } else if (!parentApp || (parentApp.enabled && !parentApp.needsUpdating)) {
    return (
      <LoadingSpinner loadingText={'Loading permissions'}/>
    );
  } else {
    return (
      <div>
        {parentApp && !parentApp.needsUpdating && parentApp.application.info.updateNotes ? (
          <UpdateNotes app={parentApp.application}
            onApproved={() => agreeTerms()}
            onRejected={() => declineTerms()}
          />
        ) : (
          <Hmi hmiType={HmiType.login.baas}
            parentApp={parentApp.application}
            onApproved={() => agreeTerms()}
            onRejected={() => declineTerms()}
          />
        )}
      </div>
    );
  }
};

export default HatLogin;
