import React, { useEffect } from 'react';
import './HatLogin.scss';
import {
  selectErrorMessage,
  setErrorMessage,
  setupApplication
} from '../hatLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HatClientService } from '../../../services/HatClientService';
import { selectParentApp } from "../../hmi/hmiSlice";
import { getApplications } from "../../applications/applicationsSlice";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { UpdateNotes } from "../UpdateNotes/UpdateNotes";
import { HmiType } from "../../hmi/hmi.interface";
import { Hmi } from "../../hmi/Hmi";
import { HmiActions } from "../../hmi/HmiActions";
import { getParameterByName } from "../../../utils/query-params";

const HatLogin: React.FC = () => {
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const errorMessage = useSelector(selectErrorMessage);
  const name = getParameterByName('name')?.toLowerCase();
  const redirect = getParameterByName('redirect');

  useEffect(() => {
    if (name && redirect) {
      dispatch(getApplications());
    } else {
      dispatch(setErrorMessage('ERROR: App details incorrect. Please contact the app developer and let them know.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agreeTerms = () => {
    if (name) {
      dispatch(setupApplication(name));
    }
  };

  const declineTerms = () => {
    // const internal = query.get('redirect') === 'true';
    const fallback = getParameterByName('fallback');

    const hatSvc = HatClientService.getInstance();
    hatSvc.logout();

    if (fallback) {
      window.location.href = fallback;
    } else {

      // dispatch(setErrorMessage('ERROR: Something went wrong. Please contact the app developer and let them know.'));
    }
  };

  useEffect(() => {
    const buildRedirect = (appName: string): void => {
      // Use internal login option when forcing HAT-native version through terms approval process
      const internal = getParameterByName('redirect') === 'true';

      if (internal) {
        if (redirect) {
          window.location.href = redirect;
        }
      } else {
        const hatSvc = HatClientService.getInstance();
        hatSvc.appLogin(appName).then(res => {
          if (res && res.parsedBody) {
            const accessToken = res.parsedBody.accessToken;
            const finalRedirect = `${ redirect }${ redirect?.includes('?') ? '&' : '?' }token=${ accessToken }`;
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
        {parentApp && parentApp.needsUpdating && parentApp.application.info.updateNotes ? (
          <UpdateNotes app={parentApp.application} />
        ) : (
          <Hmi hmiType={HmiType.baas}/>
        )}
        <HmiActions registrationType={HmiType.baas} nextStep={() => agreeTerms()} cancelStep={() => declineTerms()} />
      </div>
    );
  }
};

export default HatLogin;