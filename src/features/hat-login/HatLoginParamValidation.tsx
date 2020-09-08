import React, { useEffect } from "react";
import { getApplicationsHmi } from "../applications/applicationsSlice";
import { useDispatch } from "react-redux";
import { setRedirectError, setSkipDeps } from "./hatLoginSlice";
import * as queryString from "query-string";

type Props = {
    children: React.ReactNode;
}

type Query = {
  application_id?: string;
  name?: string;
  redirect_uri?: string;
  redirect?: string;
  skip_deps?: string;
}

const HatLoginParamValidation: React.FC<Props> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { application_id, name, redirect_uri, redirect, skip_deps } =
        queryString.parse(window.location.search) as Query;
    const applicationId = application_id || name;
    const applicationIdSafe = applicationId?.toLowerCase();
    const redirectParam = redirect_uri || redirect;

    dispatch(setSkipDeps(skip_deps === 'true'));

    if (!redirectParam) {
      dispatch(setRedirectError('application_misconfigured', 'redirect_is_required '));
      return;
    }

    if (!applicationIdSafe) {
      dispatch(setRedirectError('application_misconfigured', 'application_id_is_required '));
      return;
    }

    dispatch(getApplicationsHmi(applicationIdSafe));
  }, [dispatch]);

  return <>{props.children}</>;
};

export default HatLoginParamValidation;
