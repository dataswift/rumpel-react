import React, { useEffect } from 'react';
import { getApplicationsHmi } from '../applications/applicationsSlice';
import { useDispatch } from 'react-redux';
import { setRedirectError } from './hatLoginSlice';
import * as queryString from 'query-string';
import { logoutUser } from "../authentication/authenticationSlice";

type Props = {
  children: React.ReactNode;
};

type Query = {
  application_id?: string;
  name?: string;
  redirect_uri?: string;
  redirect?: string;
  email?: string;
  internal?: string;
};

const HatLoginParamValidation: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const emailStored = localStorage.getItem('session_email');
    const {
      application_id,
      name,
      email,
      redirect_uri,
      redirect,
      internal
    } = queryString.parse(window.location.search) as Query;
    const applicationId = application_id || name;
    const applicationIdSafe = applicationId?.toLowerCase();
    const redirectParam = redirect_uri || redirect;

    if (email && (emailStored !== email)) {
      dispatch(logoutUser());
      return;
    }

    if (!redirectParam && !internal) {
      dispatch(setRedirectError('application_misconfigured', 'redirect_is_required'));
      return;
    }

    if (!applicationIdSafe) {
      dispatch(setRedirectError('application_misconfigured', 'application_id_is_required'));
      return;
    }

    dispatch(getApplicationsHmi(applicationIdSafe));
  }, [dispatch]);

  return <>{props.children}</>;
};

export default HatLoginParamValidation;
